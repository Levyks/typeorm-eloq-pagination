# typeorm-eloq-pagination
Implementation of [Eloquent's](https://laravel.com/docs/8.x/eloquent) pagination model to TypeORM

This is basically a CTRL+C CTRL+V of the PHP code
I do not take credit for the logic of it
The only thing I did was the "converting" of the code to TS/JS

## Installation
```sh
npm install typeorm-eloq-pagination
```

## Usage
```ts
const currentPage = parseInt(req.query.page as string) || 1;

const paginator = await paginate(getRepository(Author), currentPage, 10, req.originalUrl);

// Or

const query = getRepository(Author).createQueryBuilder().where('date_of_birth > 1985-10-11');
const paginator2 = await paginate(query, currentPage, 10, req.originalUrl);
```
#### Paginator structure:
```json
{
  "items": [
    "..."
  ],
  "currentPage": 1,
  "lastPage": 3,
  "perPage": 10,
  "total": 21,
  "hasPages": true,
  "hasMorePages": true,
  "nextPageUrl": "/authors?page=2"
}
```
### Iterating
Although the array of elements is available on the `.items` property, you'll probably not need to access it in that way, you can iterate through the elements by using methods such as `.forEach()` or `for(let el in iterator)`
```ts
paginator.forEach(category => {
  // Do something with the element
});

// Or

for(let category of paginator) {
  // Do something with the element
}
```
You can also use `.map()` in the paginator to treat the values in the array of items

### Generating links

```ts
 const links = paginator.links();
 // Or
 const links2 = paginator.onEachSide(5).links();
 ```
 
 #### Links structure:
```json
[
  {
    "1": "/categories?page=1",
    "2": "/categories?page=2",
    "3": "/categories?page=3"
  }
]
```
##### Bigger example:
```json
[
  {
    "1": "/categories?page=1",
    "2": "/categories?page=2",
    "3": "/categories?page=3",
    "4": "/categories?page=4",
    "5": "/categories?page=5",
    "6": "/categories?page=6",
    "7": "/categories?page=7",
    "8": "/categories?page=8",
    "9": "/categories?page=9",
    "10": "/categories?page=10"
  },
  "...",
  {
    "19": "/categories?page=19",
    "20": "/categories?page=20"
  }
]
```
