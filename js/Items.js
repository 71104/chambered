function Items(keyboard) {
	var itemNames = ['Power Glove', 'Pistol', 'Flippers', 'Cutters', 'Skates', 'Potion'];
	var messages = ['Smaaaash!!', 'Pew, pew, pew!', 'Splish splash!', 'Snip, snip!', 'Sharp!', 'Healthy!'];

	var items = [];
	var count = {};
	var selectedIndex = 0;

	function setItem() {
		querySelector('#hiliter').style.right = (4 + 64 * (7 - selectedIndex)) + 'px';
		querySelector('img.item').style.display = 'none';
		querySelector('img#item-' + items[selectedIndex]).style.display = 'display';
	}
	function addItem(item) {
		var image = new Image();
		image.src = 'media/item/' + item + '/icon.png';
		querySelector('#item-icon-' + selectedIndex + '.item-icon').appendChild(image);
		setItem();
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
		querySelector('#loot-message #item-name').appendChild(createTextNode(itemNames[item]));
		querySelector('#loot-message #loot-specific-message').appendChild(createTextNode(messages[item]));
		querySelector('#loot-screen').style.display = 'block';
		setTimeout(function () {
			querySelector('#loot-screen #continue-button').style.display = 'inline';
			keyboard.once('down', function handler(keyCode) {
				if ((keyCode == KeyEvent.DOM_VK_SPACE) || (keyCode == KeyEvent.DOM_VK_ENTER)) {
					querySelector('#loot-screen,#loot-screen #continue-button').style.display = 'none';
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
		querySelector('img#item-' + items[selectedIndex]).style.display = 'none';
		querySelector('img#action-item-' + items[selectedIndex]).style.display = 'inline';
	};
	this.withdraw = function () {
		querySelector('img#action-item-' + items[selectedIndex]).style.display = 'none';
		querySelector('img#item-' + items[selectedIndex]).style.display = 'inline';
	};
}
