import React from "react";
import { IReview } from "sdk/reviews";
import { ReviewSdk } from "sdk";

interface IReviewContext {
  reviews?: IReview[];
  setReviews: (reviews: IReview[]) => void;
  getReviews: () => Promise<IReview[]>;
}

const REVIEWS_TO_FETCH = 127;

export const ReviewContext = React.createContext<IReviewContext>({
  reviews: undefined,
  setReviews: reviews => {},
  getReviews: () => ReviewSdk.getReviews(REVIEWS_TO_FETCH)
});

export const ReviewProvider = ReviewContext.Provider;
export const ReviewConsumer = ReviewContext.Consumer;
