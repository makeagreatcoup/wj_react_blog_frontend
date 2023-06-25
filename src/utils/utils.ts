export const getFirstWord = (str: string) => {
	return str.charAt(0)
}

export const getColor = (color) => {
	if (colorList.includes(color)
	) {
    return color
	}else{
    return 'white'
  }
}
export const colorList= [
		'white',
		'amber',
		'blue',
		'cyan',
		'green',
		'grey',
		'indigo',
		'light-blue',
		'light-green',
		'lime',
		'orange',
		'pink',
		'purple',
		'red',
		'teal',
		'violet',
		'yellow',
		
	]
