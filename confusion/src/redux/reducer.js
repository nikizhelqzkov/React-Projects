import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

export const initialState = {
    dishes: DISHES,
    promotions: PROMOTIONS,
    comments: COMMENTS,
    leaders: LEADERS
};

export const Reducer = (state = initialState, action)=>{
    return state;
}