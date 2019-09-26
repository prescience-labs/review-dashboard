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

  return <p>{markup.length > 0 ? markup : text}</p>;
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
        backgroundColor,
        padding: "0.2rem",
        borderRadius: "0.3rem",
        border: `1px solid ${color(backgroundColor).darken(0.2)}`,
        color: "white"
      }}
    >
      {children}
    </span>
  );
}

// sentence_list -> segment_list -> [ polarity_term_list -> sentimented_concept_list ]
const sample = {
  irony: "NONIRONIC",
  model: "general_en",
  agreement: "DISAGREEMENT",
  score_tag: "P",
  confidence: "86",
  subjectivity: "SUBJECTIVE",
  sentence_list: [
    {
      bop: "y",
      endp: "40",
      inip: "0",
      text: "These socks are comfortable and fit well.",
      agreement: "AGREEMENT",
      score_tag: "P",
      confidence: "100",
      segment_list: [
        {
          endp: "26",
          inip: "0",
          text: "These socks are comfortable",
          agreement: "AGREEMENT",
          score_tag: "P",
          confidence: "100",
          segment_type: "main",
          polarity_term_list: [
            {
              endp: "26",
              inip: "16",
              text: "comfortable",
              score_tag: "P",
              confidence: "100",
              sentimented_concept_list: [
                {
                  id: "fd4e787c79",
                  endp: "10",
                  form: "sock",
                  inip: "6",
                  type: "Top>Product>Textile>Clothes",
                  variant: "socks",
                  score_tag: "P"
                }
              ]
            }
          ]
        },
        {
          endp: "39",
          inip: "32",
          text: "fit well",
          agreement: "AGREEMENT",
          score_tag: "P",
          confidence: "100",
          segment_type: "main",
          polarity_term_list: [
            {
              endp: "39",
              inip: "36",
              text: "well",
              score_tag: "P",
              confidence: "100"
            }
          ]
        }
      ],
      sentimented_entity_list: [],
      sentimented_concept_list: [
        {
          id: "fd4e787c79",
          form: "sock",
          type: "Top>Product>Textile>Clothes",
          score_tag: "P"
        }
      ]
    },
    {
      bop: "n",
      endp: "131",
      inip: "41",
      text:
        "However, they are rather on the thin side, so I'm not sure how well they will wear or last.",
      agreement: "AGREEMENT",
      score_tag: "N",
      confidence: "92",
      segment_list: [
        {
          endp: "48",
          inip: "41",
          text: "However,",
          agreement: "AGREEMENT",
          score_tag: "NONE",
          confidence: "100",
          segment_type: "secondary",
          polarity_term_list: []
        },
        {
          endp: "81",
          inip: "50",
          text: "they are rather on the thin side",
          agreement: "AGREEMENT",
          score_tag: "NONE",
          confidence: "100",
          segment_type: "main",
          polarity_term_list: [],
          sentimented_concept_list: [
            {
              id: "43f84b54ed",
              endp: "81",
              form: "side",
              inip: "78",
              type: "Top>Organization",
              variant: "side",
              score_tag: "NONE"
            },
            {
              id: "a23b3d2a83",
              endp: "81",
              form: "side",
              inip: "78",
              type: "Top>Location",
              variant: "side",
              score_tag: "NONE"
            }
          ]
        },
        {
          endp: "122",
          inip: "84",
          text: "so I'm not sure how well they will wear",
          agreement: "AGREEMENT",
          score_tag: "N",
          confidence: "92",
          segment_list: [
            {
              endp: "107",
              inip: "84",
              text: "so I'm not sure how well",
              agreement: "AGREEMENT",
              score_tag: "N",
              confidence: "92",
              segment_type: "main",
              polarity_term_list: [
                {
                  endp: "107",
                  inip: "104",
                  text: "('m not) well",
                  score_tag: "N",
                  confidence: "92"
                }
              ]
            }
          ],
          segment_type: "main",
          polarity_term_list: [
            {
              endp: "107",
              inip: "104",
              text: "('m not) well",
              score_tag: "N",
              confidence: "92"
            }
          ]
        },
        {
          endp: "130",
          inip: "127",
          text: "last",
          agreement: "AGREEMENT",
          score_tag: "NONE",
          confidence: "100",
          segment_type: "secondary",
          polarity_term_list: []
        }
      ],
      sentimented_entity_list: [],
      sentimented_concept_list: [
        {
          id: "43f84b54ed",
          form: "side",
          type: "Top>Organization",
          score_tag: "NONE"
        },
        {
          id: "a23b3d2a83",
          form: "side",
          type: "Top>Location",
          score_tag: "NONE"
        }
      ]
    }
  ],
  sentimented_entity_list: [],
  sentimented_concept_list: [
    {
      id: "43f84b54ed",
      form: "side",
      type: "Top>Organization",
      score_tag: "NONE"
    },
    { id: "a23b3d2a83", form: "side", type: "Top>Location", score_tag: "NONE" },
    {
      id: "fd4e787c79",
      form: "sock",
      type: "Top>Product>Textile>Clothes",
      score_tag: "P"
    }
  ]
};
