
type Ioption ={
    page?:number | string,
    limit?:number |string,
    sortBy?:string,
    sortOrder?:string
}

type IoptionResult={
    page:number,
    limit:number,
    skip:number,
    sortBy: string,
    sortOrder:string



}
const paginationSortingHelpers=(option:Ioption):IoptionResult=>{
    const page:number = Number(option.page)||1
    const limit:number=Number(option.limit) || 10
    const skip=(page-1)*limit
    const sortBy=option.sortBy || "createdAt"
    const sortOrder=option.sortOrder || "desc"
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder

    }

}
export default paginationSortingHelpers