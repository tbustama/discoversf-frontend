import React, { useState } from "react";
import { Form, Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Spring } from "react-spring/renderprops";
import { GoSearch } from "react-icons/go";
import { FaCocktail } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiPartyPopper } from "react-icons/gi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Search = ({ handleSearch }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 1000 }}
    >
      {(props) => (
        <div style={props}>
          <Form onSubmit={handleSearch}>
            <Form.Row className="align-items-center">
              <Col className="mt-0" xs="auto">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  isClearable
                  placeholderText="Choose a date"
                  name="date-picker"
                />
              </Col>
              <Col xs="auto" className="my-1">
                <Form.Label
                  className="mr-sm-2"
                  htmlFor="inlineFormCustomSelect"
                  srOnly
                >
                  Preference
                </Form.Label>
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  name="casual"
                >
                  <option value="0">Choose...</option>
                  <option value="true">Casual</option>
                  <option value="false">Special Occassion</option>
                </Form.Control>
              </Col>
              <Col xs="auto" className="my-1">
                <Form.Label
                  className="mr-sm-2"
                  htmlFor="inlineFormCustomSelect"
                  srOnly
                >
                  Preference
                </Form.Label>
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  name="area"
                >
                  <option value="0">Choose...</option>
                  <option value="Marina">Marina</option>
                  <option value="North Beach">North Beach</option>
                  <option value="Hayes Valley">Hayes Valley</option>
                  <option value="Nob Hill">Nob Hill</option>
                </Form.Control>
              </Col>
              <Col xs="auto" className="my-1">
                <Button type="submit">
                  <GoSearch />
                </Button>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col className="mt-2 d-flex flex-row-reverse">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      Select for options of great food places in your area of
                      choice
                    </Tooltip>
                  }
                >
                  <Button variant="light outline-dark">
                    <IoFastFoodOutline />
                  </Button>
                </OverlayTrigger>
              </Col>
              <Col className="mt-2 d-flex justify-content-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      Select for the best options to get a drink in your
                      selected area
                    </Tooltip>
                  }
                >
                  <Button variant="light outline-dark">
                    <FaCocktail />
                  </Button>
                </OverlayTrigger>
              </Col>
              <Col className="mt-2">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      Check out the best events going on in your area
                    </Tooltip>
                  }
                >
                  <Button variant="light outline-dark">
                    <GiPartyPopper />
                  </Button>
                </OverlayTrigger>
              </Col>
            </Form.Row>
          </Form>
        </div>
      )}
    </Spring>
  );
};
export default Search;
