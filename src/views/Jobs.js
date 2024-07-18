/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import NormalHeader from "components/Headers/NormalHeader";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Select from "react-select";
import Jobcard from "ui/Jobcard.js";

const Jobs = () => {
  return (
    <>
      <NormalHeader />
      {/* Page content */}

      <Container className="mt--7" fluid>
        {/* <Row>
          <Col>
            <Jobcard text="Add Job" />
          </Col>
          <Col>
            <Jobcard text="Add Job" />
          </Col>
          <Col>
            <Jobcard text="Add Job" />
          </Col>
          <Col>
            <Jobcard text="Add Job" />
          </Col>
        </Row> */}

        <Row>
          <Card className="shadow">
            <CardHeader className="border-0">
              <div className="d-flex justify-content-between">
                <h3 className="mt-2">All Templates</h3>

                <Button
                  className=""
                  color="primary"
                  type="button"
                  //   onClick={() => setModalShow(true)}
                >
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <Row>
              <Col>
                <Jobcard text="Add Job" />
              </Col>
              <Col>
                <Jobcard text="Add Job" />
              </Col>
              <Col>
                <Jobcard text="Add Job" />
              </Col>
              <Col>
                <Jobcard text="Add Job" />
              </Col>
            </Row>
            {/* <Button>Add Job</Button>
            <Button>Edit Job</Button>
            <Button>Delete Job</Button>
            <Button>Job Queue</Button> */}
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Jobs;
