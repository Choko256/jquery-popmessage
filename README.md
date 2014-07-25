jquery-popmessage
=================

jQuery plugin for popping messages on webpages (needs CSS3 compatibility)

## Create pop message

```html
<div class="pop">
    <div class="pop-body">
        This is a pop message
    </div>
</div>
```

### Add a bold title
```html
<div class="pop">
    <div class="pop-title">
        Pop title
    </div>
    <div class="pop-body">
        This is a pop message with a title.
    </div>
</div>
```

### Formatting
By default, the pop message is not formatted and is black on gray.

Therefore, there are several predefined formats for colors and designs:
- **success** : a light green message for an operation success.
- **danger** : a light red message for an error message.
- **warning** : a yellow message for a warning information.
- **info** : a light blue message to display an information message.

#### Usage
```html
<div class="pop pop-success">...</div>
<div class="pop pop-danger">...</div>
<div class="pop pop-warning">...</div>
<div class="pop pop-info">...</div>
```

### Include icon
You can include an icon or an image element at the left of the popped message.
You must add a `div` with `pop-icon` class *at the beginning* of the pop message content.

#### Usage
```html
<div class="pop pop-info">
    <div class="pop-icon">
        <img src="mon-popicon.png" alt="PopIcon" />
    </div>
    ...
</div>
```
By default, pop icons as `img` are limited to 64x64 pixels.
You can override this behaviour specifying `width` and `height` in `img` attributes.

### Position

Six predefined positions:
* **top-left**
* **top-right**
* **bottom-left**
* **bottom-right**
* **top-wide** (*Takes all the document width at the top*)
* **bottom-wide** (*Takes all the document width at the bottom*)


```html
<div class="pop pop-top-left">...</div>
<div class="pop pop-top-right">...</div>
<div class="pop pop-bottom-left">...</div>
<div class="pop pop-bottom-right">...</div>
<div class="pop pop-top-wide">...</div>
<div class="pop pop-bottom-wide">...</div>
```

### Customization
#### Duration
```html
<!-- 500 milliseconds -->
<div class="pop" data-pop-delay="500">...</div>
<!-- 10 seconds -->
<div class="pop" data-pop-delay="10000">...</div>
<!-- Infinite, must be closed or hidden manually -->
<div class="pop" data-pop-delay="0">...</div>
```
#### Fade in/out effect duration
```html
<!-- Fade in 400 ms -->
<div class="pop" data-pop-fade-in="400">...</div>
<!-- Fade out 500 ms -->
<div class="pop" data-pop-fade-out="500">...</div>
<!-- Fade in 300 and Fade out 900 -->
<div class="pop" data-pop-fade-in="300" data-pop-fade-out="900">...</div>
```

#### Insert message in another element

You must add the `pop-container` class to the container:
```html
<div id="container" class="pop-container">
	<div class="pop pop-top-wide">...</div>
</div>
```

## Pop the message
### Only with HTML

```html
<div id="idPop" class="pop pop-top-wide">...</div>
<button data-trigger="pop" data-pop-id="idPop">Pop !</button>
```
Customization options are also available on trigger element :

```html
<!-- This button will pop #myPop pop message which will not automatically hide. -->
<button data-trigger="pop" data-pop-delay="0" data-pop-fade-in="300" data-id="myPop">Pop !</button>
```

You can also pop all messages by a class with the `data-pop-class` attribute :

```html
<!-- This button will pop all pop messages in the HTML document -->
<button data-trigger="pop" data-pop-delay="0" data-pop-class="pop">Pop!</button>
```

You can specify a container if the pop can be displayed in different elements :
```html
<button data-trigger="pop" data-pop-id="myPop" data-pop-container="containerid">Pop!</button>
```

**Note**: *Bottom side popmessages will not correctly work if they are used into containers. You can add your custom CSS into the `css` option.*

### With jQuery
```javascript
// Options is an **object**
$("#myButton").on('click', function() {
    $("#myPop").pop("show", {
		fadeIn: 500,
		fadeOut: 500,
		delay: 4000,
		side: 'top-wide',
		css: {},
		closable: true
	});
});
```


| Option    | Type | Default | Effect |
|-------------|-------------------------------------|
|  **fadeIn** | integer | `500` | jQuery *fadeIn* effect speed. |
| **fadeOut** | integer | `500` | jQuery *fadeOut* effect speed. |
| **delay** | integer | `4000` | Time in *milliseconds* of pop message duration. |
| **side** | string | `undefined` | Redefine position with `top-left`, `top-right`, `bottom-left`, `bottom-right`, `top-wide`, or `bottom-wide`. |
| **css** | object | `{}` | Additional CSS as a JavaScript object passed to `css` jQuery function. |
| **closable** | boolean | `true` | `true` if you want the close button, `false` otherwise |
| **container** | string | `undefined` | Pop message parent ID attribute if you don't want to pop on the whole browser window. |

## Events
| Event name        | When it triggered |
|-------------------|-------------------|
| **pop.show**      | *Triggered when showing process starts* |
| **pop.shown**     | *Triggered when showing process is finished* |
| **pop.hide**      | *Triggered when hiding process starts* |
| **pop.hidden**    | *Triggered when hiding process is finished* |

You can bind these events with the `on` jQuery method as you do with other jQuery events.

```javascript
$("#myPop").on('pop.shown', function() {
  /* Do something here */
});
```

