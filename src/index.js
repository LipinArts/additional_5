module.exports = function check(str, bracketsConfig) {
	const open = {};
	const closed = {};
	const stack = [];

	bracketsConfig = bracketsConfig.join(",").split(","); // распарсили массив массивов скобок

	//создаем уникальную коллекцию открытых и закрытых скобок из bracketsConfig
	for (var i = 0; i < bracketsConfig.length; i++) {
		// для каждого элемента создаём свойство
		let key = bracketsConfig[i];

		if (key === bracketsConfig[i + 1]) {
			open[key] = bracketsConfig[i];
			closed[open[key]] = true;
			i++;
		} else {
			if (key === bracketsConfig[i - 1]) {
				delete open[key];
			} else {
				open[key] = bracketsConfig[i + 1];
				closed[open[key]] = true;
				i++;
			}
		}
	}

	for (let i = 0; i < str.length; i++) {
		// бежим по входящей строке из скобок
		let bracket = str[i]; //текущая скобка в последовательности

		//если открытая и закрытая скобка одинаковы
		if (bracket === open[bracket]) {
			if (bracket === stack[stack.length - 1]) {
				//если текущая скобка равна последней из массива
				stack.pop(); //удаляем последнюю из массива
			} else {
				stack.push(bracket); //иначе добавляем текущую
			}

			//если открытая скобка и закрытая не одинаковы
		} else {
			if (open[bracket]) {
				//если текущая совпадает по ключу в коллекции открытых скобок
				stack.push(bracket); // добавляем в массив
			} else if (closed[bracket]) {
				// если текущая совпадает по ключу в коллекции закрытых скобок
				let last = stack.pop(); // удаляем из массива и записываем возращенную скобку в переменную
				if (open[last] !== bracket) {
					// если последняя скобка по ключу в открытой коллекции не равна текущей
					return false; // последовательность неверна и возвращаем false
				}
			}
		}
	}
	return stack.length === 0; //если массив пустой, значит последовательность верна и возращаем true
};
