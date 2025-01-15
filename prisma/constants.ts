export const categories = [
	{
		name: 'Піци',
	},
	{
		name: 'Сніданки',
	},
	{
		name: 'Закуски',
	},
	{
		name: 'Коктейлі',
	},
	{
		name: 'Напої',
	},
];


export const _ingredients = [
	{
		name: 'Сирний бортик',
		price: 45,
		imageUrl: '/assets/images/pizzas/ingredients/99f5cb91225b4875bd06a26d2e842106.png',
	},
	{
		name: 'Вершкова моцарела',
		price: 50,
		imageUrl: '/assets/images/pizzas/ingredients/cdea869ef287426386ed634e6099a5ba.png',
	},
	{
		name: 'Сири чедер і пармезан',
		price: 55,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A22FA54A81411E9AFA69C1FE796.png',
	},
	{
		name: 'Гострий перець халапеньо',
		price: 30,
		imageUrl: '/assets/images/pizzas/ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
	},
	{
		name: 'Ніжний курча',
		price: 50,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A39D824A82E11E9AFA5B328D35A.png',
	},
	{
		name: 'Шампіньйони',
		price: 30,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A22FA54A81411E9AFA67259A324.png',
	},
	{
		name: 'Шинка',
		price: 60,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A39D824A82E11E9AFA61B9A8D61.png',
	},
	{
		name: 'Пікантна пепероні',
		price: 60,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A22FA54A81411E9AFA6258199C3.png',
	},
	{
		name: 'Гостра чорізо',
		price: 65,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A22FA54A81411E9AFA62D5D6027.png',
	},
	{
		name: 'Мариновані огірочки',
		price: 25,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A21DA51A81211E9EA89958D782B.png',
	},
	{
		name: 'Свіжі томати',
		price: 28,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A39D824A82E11E9AFA7AC1A1D67.png',
	},
	{
		name: 'Червона цибуля',
		price: 20,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A22FA54A81411E9AFA60AE6464C.png',
	},
	{
		name: 'Соковиті ананаси',
		price: 73,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A21DA51A81211E9AFA6795BA2A0.png',
	},
	{
		name: 'Італійські трави',
		price: 15,
		imageUrl: '/assets/images/pizzas/ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
	},
	{
		name: 'Солодкий перець',
		price: 38,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A22FA54A81411E9AFA63F774C1B.png',
	},
	{
		name: 'Кубики бринзи',
		price: 48,
		imageUrl: '/assets/images/pizzas/ingredients/000D3A39D824A82E11E9AFA6B0FFC349.png',
	},
	{
		name: 'Мітболи',
		price: 64,
		imageUrl: '/assets/images/pizzas/ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }));


export const products = [
	{
		name: 'Омлет із шинкою та грибами',
		imageUrl: '/assets/images/pizzas/11EE7970321044479C1D1085457A36EB.webp',
		categoryId: 2,
	},
	{
		name: 'Омлет із пепероні',
		imageUrl: '/assets/images/pizzas/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
		categoryId: 2,
	},
	{
		name: 'Кава Лате',
		imageUrl: '/assets/images/pizzas/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
		categoryId: 2,
	},
	{
		name: 'Денвіч шинка і сир',
		imageUrl: '/assets/images/pizzas/11EE796FF0059B799A17F57A9E64C725.webp',
		categoryId: 3,
	},
	{
		name: 'Курячі нагетси',
		imageUrl: '/assets/images/pizzas/11EE7D618B5C7EC29350069AE9532C6E.webp',
		categoryId: 3,
	},
	{
		name: 'Картопля з печі з соусом 🌱',
		imageUrl: '/assets/images/pizzas/11EED646A9CD324C962C6BEA78124F19.webp',
		categoryId: 3,
	},
	{
		name: 'Додстер',
		imageUrl: '/assets/images/pizzas/11EE796F96D11392A2F6DD73599921B9.webp',
		categoryId: 3,
	},
	{
		name: 'Гострий Додстер 🌶️🌶️',
		imageUrl: '/assets/images/pizzas/11EE796FD3B594068F7A752DF8161D04.webp',
		categoryId: 3,
	},
	{
		name: 'Банановий молочний коктейль',
		imageUrl: '/assets/images/pizzas/11EEE20B8772A72A9B60CFB20012C185.webp',
		categoryId: 4,
	},
	{
		name: 'Карамельне яблуко молочний коктейль',
		imageUrl: '/assets/images/pizzas/11EE79702E2A22E693D96133906FB1B8.webp',
		categoryId: 4,
	},
	{
		name: 'Молочний коктейль із печивом Орео',
		imageUrl: '/assets/images/pizzas/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
		categoryId: 4,
	},
	{
		name: 'Класичний молочний коктейль 👶',
		imageUrl: '/assets/images/pizzas/11EE796F93FB126693F96CB1D3E403FB.webp',
		categoryId: 4,
	},
	{
		name: 'Ірландський Капучино',
		imageUrl: '/assets/images/pizzas/11EE7D61999EBDA59C10E216430A6093.webp',
		categoryId: 5,
	},
	{
		name: 'Кава Карамельний капучино',
		imageUrl: '/assets/images/pizzas/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
		categoryId: 5,
	},
	{
		name: 'Кава Кокосовий лате',
		imageUrl: '/assets/images/pizzas/11EE7D61B19FA07090EE88B0ED347F42.webp',
		categoryId: 5,
	},
	{
		name: 'Кава Американо',
		imageUrl: '/assets/images/pizzas/11EE7D61B044583596548A59078BBD33.webp',
		categoryId: 5,
	},
	{
		name: 'Кава Лате',
		imageUrl: '/assets/images/pizzas/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
		categoryId: 5,
	},
];

