class Pagination {
    perpage: number;
    currentpage: number;
  
    constructor(perpage=3,currentpage=1){
        this.perpage = perpage,
        this.currentpage = currentpage
    }   
     limit(){
        return this.perpage;
    }
    offset() {
        return (this.currentpage-1)* this.limit();
    }
}
export default  Pagination;