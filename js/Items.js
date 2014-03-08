function Items(keyboard) {
	var itemNames = ['Power Glove', 'Pistol', 'Flippers', 'Cutters', 'Skates', 'Potion'];
	var messages = ['Smaaaash!!', 'Pew, pew, pew!', 'Splish splash!', 'Snip, snip!', 'Sharp!', 'Healthy!'];

	var items = [];
	var count = {};
	var selectedIndex = 0;

	function setItem() {
		document.querySelector('#hiliter').style.right = (4 + 64 * (7 - selectedIndex)) + 'px';
		var itemImages = document.querySelectorAll('img.item');
		for (var i = 0; i < itemImages.length; i++) {
			itemImages[i].style.display = 'none';
		}
		document.querySelector('img#item-' + items[selectedIndex]).style.display = 'display';
	}
	function addItem(item) {
		var image = new Image();
		image.src = 'media/item/' + item + '/icon.png';
		document.querySelector('#item-icon-' + selectedIndex + '.item-icon').appendChild(image);
		setItem();
	}

	function setElementText(selector, text) {
		var element = document.querySelector(selector);
		while (element.hasChildNodes()) {
			element.removeChild(element.firstChild);
		}
		element.appendChild(document.createTextNode(text));
	}

	this.found = function (item) {
		if (item in count) {
			if (item == 1) {
				count[item] += 20;
			} else if (item == 5) {
				count[item]++;
			}
		} else {
			selectedIndex = items.length;
			items.push(item);
			if (item != 5) {
				count[item] = 1;
			} else {
				count[item] = 20;
			}
			addItem(item);
		}
		setElementText('#loot-message #item-name', itemNames[item]);
		setElementText('#loot-message #loot-specific-message', messages[item]);
		document.querySelector('#loot-screen').style.display = 'block';
		setTimeout(function () {
			document.querySelector('#loot-screen #continue-button').style.display = 'inline';
			keyboard.once('down', function handler(keyCode) {
				if ((keyCode == KeyEvent.DOM_VK_SPACE) || (keyCode == KeyEvent.DOM_VK_ENTER)) {
					document.querySelector('#loot-screen,#loot-screen #continue-button').style.display = 'none';
				}
			});
		}, 750);
	};
	this.select = function (index) {
		if ((index >= 0) && (index < 8)) {
			selectedIndex = index;
			setItem();
		}
		return items[selectedIndex];
	};
	this.getSelected = function () {
		return items[selectedIndex];
	};
	this.use = function () {
		var item = items[selectedIndex];
		if ((item == 1) || (item == 5)) {
			return --count[item] > 0;
		} else {
			return count[item] > 0;
		}
	};

	this.action = function () {
		document.querySelector('img#item-' + items[selectedIndex]).style.display = 'none';
		document.querySelector('img#action-item-' + items[selectedIndex]).style.display = 'inline';
	};
	this.withdraw = function () {
		document.querySelector('img#action-item-' + items[selectedIndex]).style.display = 'none';
		document.querySelector('img#item-' + items[selectedIndex]).style.display = 'inline';
	};
}
