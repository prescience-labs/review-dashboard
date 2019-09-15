import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
  Row
} from "reactstrap";

export default function DataTable(props) {

  const { tableTitle, willPaginate, theaders } = props

  return (
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">{tableTitle}</h3>
          </div>
          <div className="col text-right">
            <Button
              color="primary"
              href="#pablo"
              onClick={e => e.preventDefault()}
              size="sm"
            >
              See all
            </Button>
          </div>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            {
              theaders.map((th) => (
                <th scope="col">{th}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {props.children}
        </tbody>
      </Table>
      {willPaginate && (<CardFooter className="py-4">
        <nav aria-label="...">
          <Pagination
            className="pagination justify-content-end mb-0"
            listClassName="justify-content-end mb-0"
          >
            <PaginationItem className="disabled">
              <PaginationLink
                href="#pablo"
                onClick={e => e.preventDefault()}
                tabIndex="-1"
              >
                <i className="fas fa-angle-left" />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="active">
              <PaginationLink
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                2 <span className="sr-only">(current)</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fas fa-angle-right" />
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
      </CardFooter>) }
    </Card>
  );
}
