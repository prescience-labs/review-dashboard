import React from "react";
import { IReview } from "sdk/reviews";

interface IReviewContext {
  reviews?: IReview[];
  setReviews: (reviews: IReview[]) => void;
}

export const ReviewContext = React.createContext<IReviewContext>({
  reviews: undefined,
  setReviews: reviews => {}
});

export const ReviewProvider = ReviewContext.Provider;
export const ReviewConsumer = ReviewContext.Consumer;
