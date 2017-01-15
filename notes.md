#	Schema

## Product
1.	#### 	title (string)
2.	#### 	categories (array of int)
3.	####	featured image (string)
4.	####	thumbnail image (string)
5.	####	other images (array of string)
6.	####	price (int)
7.	####	discount (int)
8.	####	description (string)
9.	####	likesCount (int)
10.	####	dislikesCount (int)

## Category
1.	####	title	(string)
2.	####  slug	(string)
3.	####	categoryId	(int)

## Order
1.	####	user	(pointer)
2.	####	products	(relation)
3.	####	status	(int)

## Cart
1.	####	order	(pointer)
> Create new cart afterSave new user.

## Review
1.	####  product  (pointer)
2.	####	user	(pointer)
3.	####	text	(string)

## Like
1.	####	user	(pointer)
2.	####	type	(int)
3.	####  product  (pointer)
>	Check if user has liked this product beforeSave then increment the like or dislikes of this product afterSave.