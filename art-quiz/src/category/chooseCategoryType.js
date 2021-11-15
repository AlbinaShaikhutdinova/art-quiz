
import './style.scss';
import pic from '../utils/importPics';

export default function chooseType(type){
    const amountQ = 10;
    const amountCategories = type ==='artist'? 12 : 24;
    let i = type ==='artist'? 0 : 12;
    let a=0;
    const items = document.getElementsByClassName('category-item')
    for(i;i<amountCategories;i++)
    {
        fillCategories(i,pic[i*10],items[a++]);
    }
}
  
function fillCategories(index,image,item){
    item.id = index;
    item.style.backgroundImage = "url('"+image+"')";
    
}