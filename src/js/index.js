const headers = [
  {
    depth: 2,
    slug: "astro-scroll-component",
    text: "Astro scroll component",
  },
  { depth: 2, slug: "first-news", text: "First news" },
  { depth: 3, slug: "lorem-new-est", text: "lorem New est" },
  { depth: 3, slug: "newest-news", text: "Newest news" },
  { depth: 2, slug: "first-news", text: "First news" },
  { depth: 3, slug: "second-news", text: "Second news" },
  { depth: 4, slug: "third-news", text: "Third news" },
  { depth: 4, slug: "it-should-be-four", text: "It should be four" },
  { depth: 3, slug: "second-news", text: "Second news" },
  { depth: 4, slug: "third-news", text: "Third news" },
  { depth: 4, slug: "it-should-be-four", text: "It should be four" },
  { depth: 2, slug: "next-topic", text: "Next Topic" },
  { depth: 4, slug: "third-news", text: "Third news" },
  { depth: 4, slug: "third-news", text: "Third news" },
];

function m(current, index, type) {
  index++;
  let next = headers[index];
  let r = {};
  r[current[type]] = {};
  while (current?.depth == next?.depth && index < headers.length) {
    r[next[type]] = {};
    index++;
    next = headers[index];
  }
  return r;
}

function gen(current, index) {
  index++;
  let next = headers[index];
  let r = [];
  r = [...r,current];
  if( !(current?.depth == next?.depth) ){
    r[r.length-1].next = index;
    // if(!(index<headers.length)) r[r.length-1].next = null;
    if( current?.depth < next?.depth ) {
        r[r.length-1].anyMore = true;
    }else{
        r[r.length-1].anyMore = false;
    }
    // if( current?.depth > next?.depth ) {
    //     console.log('child');
    // }
  }
  while (current?.depth == next?.depth ) {
    r = [...r,next] 
    index++;
    next = headers[index];
    if(index < headers.length) {
        r[r.length-1].next = index;
        if( current?.depth < next?.depth ) {
            r[r.length-1].anyMore = true;
        }else{
            r[r.length-1].anyMore = false;
        }
        // console.log('---------------');
        // console.log('headers NExT', headers[index-1]?.depth < next?.depth );
        // console.log('---------------')
        break;
    }
  }
  return r;
}

let i = 0;
let result = [];
while(i < headers.length) {
    let l = gen(headers[i],i);
    result = [...result,...l];
    i = l[l.length-1]?.next;
    // console.log(i);
}
result[result.length-1].isLast = true;

console.log(result)
