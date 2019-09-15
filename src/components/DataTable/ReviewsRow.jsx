import React from 'react';

import {
  Media,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";

const REVIEW_STATUS = {
  pending: {
    statusIcon: 'bg-warning',
    displayText: 'pending'
  },
  completed: {
    statusIcon: 'bg-success',
    displayText: 'completed'
  },
  delayed: {
    statusIcon: 'bg-danger',
    displayText: 'delayed'
  },
  schedule: {
    statusIcon: 'bg-info',
    displayText: 'on schedule'
  },
}

export default function ReviewsRow(props) {

  const { store, purchasePrice, status, avatar } = props

  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <a
            className="avatar rounded-circle mr-3"
            href="#pablo"
            onClick={e => e.preventDefault()}
          >
            <img
              alt={store.name}
              src={store.img}
            />
          </a>
          <Media>
            <span className="mb-0 text-sm">{store.name}</span>
          </Media>
        </Media>
      </th>
      <td>{purchasePrice}</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className={REVIEW_STATUS[status].statusIcon} />
          {REVIEW_STATUS[status].displayText}
        </Badge>
      </td>
      <td>
        <div className="avatar-group">
          <a
            className="avatar avatar-sm"
            href="#pablo"
            id={avatar.id}
            onClick={e => e.preventDefault()}
          >
            <img
              alt={avatar.name}
              className="rounded-circle"
              src={avatar.img}
            />
          </a>
          <UncontrolledTooltip
            delay={0}
            target={avatar.id}
          >
            {avatar.name}
          </UncontrolledTooltip>
        </div>
      </td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={e => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Action
            </DropdownItem>
            <DropdownItem
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Another action
            </DropdownItem>
            <DropdownItem
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Something else here
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  )
}
