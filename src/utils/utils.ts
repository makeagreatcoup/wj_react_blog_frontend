export const errorMsg=['该项为必填项','请输入文章主体']

export const getFirstWord = (str: string) => {
	return str.charAt(0)
}


export const getRandomColor = ()=>{
	const randomIndex = Math.floor(Math.random() * colorList.length);
	return colorList[randomIndex]
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
		// 'white',
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
