/**
 * I want to dynamically load jQuery IFF this JS file is loaded.  That means
 * loading it dynamically.  Fortunately, the new ES11 standard (TC-39)
 * includes exactly what I need -- a dynamic import() function that returns a
 * Promise indicating whether the import was successful.
 *
 * That means these three lines do not need to be in the main HTML file:
    <script type="text/javascript"
	    src="http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.js"></script>
    <script type="text/javascript">
 *
 */
import('http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.js')
    .then(() => readyFunction())
    .catch(() => console.error('BOOM!'));

/**
 * This is the normal jQuery "document-ready" function.  I can't define it with the
 * usual $() syntax since the $ won't be defined yet -- it's not defined until
 * the import Promise is resolved successfully.  So I define it as a regular
 * function and then invoke it from .then() when the Promise finishes.
 */
function readyFunction() {
    "use strict";

    console.log('executing readyFunction...');
    // Insert the needed CSS so we don't need to include yet another file.
    (() => {
	const $head = $('head');
	$head.append(`
	    <style>
	    @media print {
		div.control {
		    display: none;
		}
	    }
	    </style>
	`);
    })();

    const $slider = $('<input type="range" min="1" max="100" value="100" />');
    const $control = $('<div class="control" />');

    const $content = $('div.content');
    $content.each((i, e) => {
	const $this = $(e);
	const $input = $slider.clone();
	const $div = $control.clone().append($input);
	$this.prepend($div);
	let height = 0;
	$input.on('input', (e) => {
	    if (height === 0) {
		height = $this.innerHeight();  // Can't do this early
	    }
	    const scale = $input.val() / 100;
	    const $object = $('object', $this);
	    $object.css('transform', `translateY(${height*(1-scale)/-2.0}px) scale(${scale})`);
	    $this.innerHeight(scale * height);
	});
    });
}
