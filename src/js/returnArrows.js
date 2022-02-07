/*
const headers = [                                                 | const arr = [
  {                                                               |     { 
    depth: 2,                                                     |         depth:    
    slug: 'astro-scroll-component',                               |  
    text: 'Astro scroll component'                                |  
  },                                                              |  
  { depth: 3, slug: 'lorem-new-est', text: 'lorem New est' },     |  
  { depth: 3, slug: 'newest-news', text: 'Newest news' },         |  
  { depth: 2, slug: 'first-news', text: 'First news' },           |  
  { depth: 3, slug: 'second-news', text: 'Second news' },         |  
  { depth: 4, slug: 'third-news', text: 'Third news' },           |  
  { depth: 4, slug:'it-should-be-four',text:'It should be four' },|
  { depth: 2, slug: 'next-topic', text: 'Next Topic' }            |  
]                                                                 |  
*/
// headers are not passes as props but a global variable
const getSibling = (index) => {
    let siblings = [];
    const baseCond = headers.length > index;
    while(headers[index]['depth']===headers[index+1]['depth']){
        siblings = [...siblings,headers[index]];
    }
}

const menu = [
	{
		name: 'Astro scroll component',
		link: '/astro-scroll-component',
	},
	{
		name: 'About',
		link: '/about',
		menu: [
			{
				name: 'About Company',
				link: '/about/company'
			},
			{
				name: 'About Community',
				link: '/about/community',
				menu: [
					{
						name: 'About Community Rules',
						link: '/about/community/rules',
						menu: [
							{
								name: 'About Community: Excellence',
								link: '/about/community/rules/be-excellent-to-eacher'
							},
							{
								name: 'About Community: Party',
								link: '/about/community/rules/party-on-dudes'
							},
						],
					},
				]
			},
		]
	},
]

function rec(index,prev,result){
    index++;
    current = arr[index];
    // if(prev !== undefined){
        result[prev['slug']] = {};
    // }
    while ( current?.depth> prev?.depth && index<arr.length) {
        // console.log("Index Going in",index,"\nCurrent",current,"\nPrevious",prev);
        [b2,prev2,index,result] = rec(index,current,result);
        result[prev['slug']][prev2['slug']] = result;
        // console.log("Prev2",prev2,"\nB2B2",b2,"\nPrevious",prev,"\n")
    }
    return [current,prev,index,result];
}

function returnArrows(arr,type) {
    let index = 0;
    let result = {};
    let current =  arr[index];
    let prev = current;
    do {
        while( current?.depth>= prev?.depth ) {
            // [b,prev,result] = rec(itr,b,result);
            // result[prev.value['slug']] = result;
            [b2,prev2,index,result] = rec(index,current,result);
            console.log(index);
            result[prev2[type]] = result;
            current = b2
            prev = prev2;
            // result[prev.value[type]] = rec(itr,b,result);
        }
        prev = current;
        index++;
        current = arr[index];
    } while (index<arr.length);
    return result;
}

r = returnArrows(arr,'slug')

console.log(r)

        // if(index<arr.length)
        //     console.log(
        //         "In REC FUNCTION Current\n \t\t\t",
        //         current.depth>prev.depth,
        //         prev.depth,current.depth,
        //         prev.slug,
        //         current.slug
        //     )
