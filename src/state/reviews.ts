import React from "react";
import { IReview, IApiResponse } from "sdk/reviews";
import { ReviewSdk } from "sdk";

interface IReviewContext {
  reviews?: IReview[];
  setReviews: (reviews: IReview[]) => void;
  getReviews: () => Promise<IApiResponse<IReview[]>>;
}

const REVIEWS_TO_FETCH = 500;

export const ReviewContext = React.createContext<IReviewContext>({
  reviews: undefined,
  setReviews: reviews => {},
  getReviews: () => ReviewSdk.getReviews({ limit: REVIEWS_TO_FETCH })
});

export const ReviewProvider = ReviewContext.Provider;
export const ReviewConsumer = ReviewContext.Consumer;
