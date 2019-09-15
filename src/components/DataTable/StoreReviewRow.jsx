import React from 'react';
import { Progress } from "reactstrap";

export default function StoreReviewsRow(props) {

  const { store } = props

  return (
    <tr>
      <th scope="row">{store.name}</th>
      <td>{store.visitors}</td>
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{store.value}%</span>
          <div>
            <Progress
              max="100"
              value={store.value}
              barClassName={store.progessColor}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}
