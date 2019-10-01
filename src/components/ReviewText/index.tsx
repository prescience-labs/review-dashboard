import React from "react";
import { IReview, ScoreTag } from "sdk/reviews";
import color from "color";
import "./ReviewText.scss";
import * as entitites from "entities";
interface IProps {
  review: IReview;
}

type ScoredWord = {
  start: number;
  end: number;
  score: ScoreTag;
  isAspect: boolean;
};

export function ReviewText(props: IProps) {
  const { sentiment_analysis } = props.review;
  if (!sentiment_analysis || !sentiment_analysis.sentence_list) {
    return <p>{entitites.decodeHTML(props.review.text)}</p>;
  }
  const analyzedTerms = sentiment_analysis.sentence_list.reduce<ScoredWord[]>(
    (accumulatedSentences, sentence) => {
      return [
        ...accumulatedSentences,
        ...(sentence.segment_list || []).reduce(
          (accumulatedSegments, segment) => {
            return [
              ...accumulatedSegments,
              ...(segment.polarity_term_list || []).reduce(
                (accumulatedPolarities, polarity) => {
                  if (!polarity.sentimented_concept_list)
                    return accumulatedPolarities;
                  return [
                    ...accumulatedPolarities,
                    {
                      start: parseInt(polarity.inip, 10),
                      end: parseInt(polarity.endp, 10),
                      score: polarity.score_tag,
                      isAspect: false
                    },
                    ...(polarity.sentimented_concept_list || []).reduce(
                      (accumulatedSentiments, sentiment) => {
                        return [
                          ...accumulatedSentiments,
                          {
                            start: parseInt(sentiment.inip, 10),
                            end: parseInt(sentiment.endp, 10),
                            score: sentiment.score_tag,
                            isAspect: true
                          }
                        ];
                      },
                      []
                    )
                  ];
                },
                []
              )
            ];
          },
          []
        )
      ];
    },
    []
  );
  const { text } = props.review;
  const { markup } = analyzedTerms
    .sort((a, b) => a.start - b.start)
    .reduce(
      (prev, { start, end, score, isAspect }, index, arr) => {
        // if the cursor is ahead of the start index, and this is the last item in the array, attach the rest of the text
        if (prev.cursor > start && !(index + 1 < arr.length)) {
          return {
            ...prev,
            markup: [
              ...prev.markup,
              entitites.decodeHTML(text.slice(prev.cursor, text.length))
            ]
          };
        }
        // if the cursor is out of bounds or ahead of the start index, move on to the next element
        if (prev.cursor > text.length || prev.cursor > start) {
          return prev;
        }
        // at this point, we know we need to add the markup between the previous cursor and the start index
        const newMarkup = [
          ...prev.markup,
          <span>{entitites.decodeHTML(text.slice(prev.cursor, start))}</span>
        ];
        // the same word can be the subject of multiple analyses. We need to find the longest analysis and use that for our highlighter
        let newCursor = end;
        for (
          let cursorIncrementer = index + 1;
          cursorIncrementer < arr.length;
          cursorIncrementer++
        ) {
          if (arr[cursorIncrementer].start !== start) break;
          if (
            arr[cursorIncrementer].end - arr[cursorIncrementer].start >
            end - start
          ) {
            newCursor = arr[cursorIncrementer].end;
          }
        }
        // once we have the longest word, we can highlight that segment of text
        return {
          markup: [
            ...newMarkup,
            <SentimentText key={start} sentiment={score} isAspect={isAspect}>
              {entitites.decodeHTML(text.slice(start, newCursor + 1))}
            </SentimentText>
          ],
          cursor: newCursor + 1
        };
      },
      { markup: [], cursor: 0 }
    );

  return (
    <p style={{ lineHeight: "2.2rem" }}>{markup.length > 0 ? markup : text}</p>
  );
}

function SentimentText({ children, sentiment, isAspect = false }) {
  const colors = {
    negative: "#a34e4e",
    positive: "#70c286",
    neutral: "#878787"
  };
  const backgroundColor = isAspect
    ? colors.neutral
    : sentiment.indexOf("P") > -1
    ? colors.positive
    : colors.negative;
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${color(
          backgroundColor
        ).lighten(0.6)}, ${color(backgroundColor)
          .lighten(0.1)
          .opaquer(-0.8)})`,
        padding: "0.2rem",
        borderRadius: "0.3rem",
        border: `1px solid ${color(backgroundColor)
          .darken(0.2)
          .opaquer(-0.8)}`,
        color: color(backgroundColor)
          .darken(0.7)
          .toString()
      }}
    >
      {children}
    </span>
  );
}
