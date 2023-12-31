import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Shimmer from "./Shimmer";
import RecommCards from "./RecommCards";
import useRestaurant from "../helper/useRestaurant";
import { addItem } from "../helper/cartSlice";
import { useDispatch } from "react-redux";


const Card_Detail=()=>{
    const params=useParams();
    const {resId}=params;
  

    const [restaurant,recomm]=useRestaurant(resId);

// console.log(recomm);
    //dispatching action for demo
    const dispatch=useDispatch();
    //  const handleAddItem=()=>{
    //   dispatch(addItem("banana"))
    //  };
     
     // actual dispatching action with data
     const addFoodItem=(food)=>{
      dispatch(addItem(food));
     };
     
    return !(restaurant || recomm) ?(
    <Shimmer/>
    )
    :(
      <div className="m-5">

  
        <div className="flex justify-between">
        <div>
        <h2 className="font-bold text-xl">{restaurant?.name}</h2>
        <h3 className="font-semibold">{restaurant?.city}</h3>
        </div>
        <div className="border-2 p-1">
        <h3>{restaurant?.costForTwoMessage}</h3>  
        <h3 className="border-t-2 text-center text-green-500">{restaurant?.avgRating} ☆</h3>
        </div>
        </div>
        {/* <div className="p-1 m-5 bg-green-500 text-white w-14 cursor-pointer  hover:scale-95 transition-transform duration-200 text-center tracking-wide text-lg  font-semibold" onClick={()=>handleAddItem()}>Add</div> */}

        <div className="text-center mt-4 text-2xl font-semibold text-orange-400">
          What's New ?
        </div>
        <ul data-testid="id">
        {
          recomm.map((card)=>{
              return(
                <li key={card?.card?.info?.id} className="border-y-[1px]">
                <RecommCards key={card?.card?.info?.id} {...card?.card?.info}/>
                <button data-testid="add-btn" className="p-1 ml-3 mb-3 bg-green-500 text-white w-14 cursor-pointer  hover:scale-95 transition-transform duration-200 text-center tracking-wide text-lg  font-semibold" onClick={()=>addFoodItem(card?.card?.info)}>Add</button>
                </li>
              )
          })
        }
        </ul>



        </div>
    )           
}

export default Card_Detail