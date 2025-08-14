'use client';

import Pageheader from '@/shared/layouts-components/page-header/pageheader';
import Seo from '@/shared/layouts-components/seo/seo';
import Link from 'next/link';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import ReactFlowClient from './add-whatsapp-broadcast/ReactFlowPage';
import { Button, Card, Col, Pagination, Row, Table } from "react-bootstrap";
import SpkTablescomponent from '@/shared/@spk-reusable-components/reusable-tables/tables-component';
import DeleteBroadcast from './DeleteBroadcast';

const WhatsappBroadcast = () => {

  const [isOpen, setIsOpen] = useState<any>(false);

  const [selectedItems, setSelectedItems] = useState<any>([]);

  const handleCheckboxClick = (id: string) => {
    setSelectedItems((prevSelected: string[]) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item: string) => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Fragment>
      <Seo title="Ecommerce-AddWhatsappProduct" />

      <Pageheader title="Broadcasting" currentpage="Whatsapp Broadcast" />

      <div className='d-flex gap-3'>
        <h5 className='mb-0'>WhatsApp Broadcasting</h5>
        {/* <button className='create-whatsApp-broadcasting'><i className="fa-solid fa-circle-plus"></i> Create</button> */}
        <Link href="/broadcasting/whatsapp-broadcast/add-whatsapp-broadcast" className='create-whatsApp-broadcasting text-decoration-none fw-semibold' target='_blank'><i className="fa-solid fa-circle-plus"></i> Create</Link>
      </div>

      {/* <div className='d-flex gap-3 mt-3'>
        <Button onClick={() => setIsOpen(true)}>Delete Broadcast</Button>
      </div> */}

      <Row>
        <Col xl={12}>
          <Card className="custom-card">
            {/* <Card.Header>
              <div className="card-title">
                Products List
              </div>
            </Card.Header> */}
            <Card.Body>
              <div className="table-responsive">
                {/* <SpkTablescomponent tableClass="text-nowrap table-bordered" onChange={handleSelectAll} header={[{ title: 'Campaign Name' }, { title: 'Status' }, { title: 'Actions' }, { title: 'Targeted' }, { title: 'Sent' }, { title: 'Delivered' }, { title: 'Opened' }, { title: 'Unreached' }, { title: 'Schedule at' }]}>
                  <tr className="product-list" key={Math.random()}>
                    <td className='text-center'>1</td>
                    <td><span className='badge bg-primary-transparent'>Published</span></td>
                    <td className='text-center'>3</td>
                    <td className='text-center'>4</td>
                    <td className='text-center'>5</td>
                    <td className='text-center'>6</td>
                    <td className='text-center'>7</td>
                    <td className='text-center'>8</td>
                    <td className='text-center'>9</td>
                  </tr>
                  <tr className="product-list" key={Math.random()}>
                    <td className='text-center'>1</td>
                    <td><span className='badge bg-danger-transparent'>Unpublished</span></td>
                    <td className='text-center'>3</td>
                    <td className='text-center'>4</td>
                    <td className='text-center'>5</td>
                    <td className='text-center'>6</td>
                    <td className='text-center'>7</td>
                    <td className='text-center'>8</td>
                    <td className='text-center'>9</td>
                  </tr>
                </SpkTablescomponent> */}
                <Table>
                  <thead>
                    <tr>
                      <th className='text-nowrap table-bordered text-start'>Campaign Name</th>
                      <th className='text-nowrap table-bordered text-center'>Status</th>
                      <th className='text-nowrap table-bordered text-center'>Actions</th>
                      <th className='text-nowrap table-bordered text-center'>Targeted</th>
                      <th className='text-nowrap table-bordered text-center'>Sent</th>
                      <th className='text-nowrap table-bordered text-center'>Delivered</th>
                      <th className='text-nowrap table-bordered text-center'>Opened</th>
                      <th className='text-nowrap table-bordered text-center'>Unreached</th>
                      <th className='text-nowrap table-bordered text-end'>Schedule at</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="product-list" key={Math.random()}>
                      <td className='text-start'>1</td>
                      <td className='text-center'><span className='badge bg-primary-transparent'>Published</span></td>
                      <td className='text-center'>2</td>
                      <td className='text-center'>3</td>
                      <td className='text-center'>4</td>
                      <td className='text-center'>5</td>
                      <td className='text-center'>6</td>
                      <td className='text-center'>7</td>
                      <td className='text-end'>8</td>
                    </tr>
                    <tr className="product-list" key={Math.random()}>
                      <td className='text-start'>1</td>
                      <td className='text-center'><span className='badge bg-danger-transparent'>Unpublished</span></td>
                      <td className='text-center'>2</td>
                      <td className='text-center'>3</td>
                      <td className='text-center'>4</td>
                      <td className='text-center'>5</td>
                      <td className='text-center'>6</td>
                      <td className='text-center'>7</td>
                      <td className='text-end'>8</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <div className="card-footer">
              <div className="d-flex align-items-center flex-wrap overflow-auto">
                <div className="mb-2 mb-sm-0">
                  Showing <b>1</b> to <b>2</b> of <b>2</b> entries <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
                </div>
                <div className="ms-auto">
                  <Pagination className="pagination mb-0 overflow-auto">
                    <Pagination.Item disabled>Previous</Pagination.Item>
                    <Pagination.Item active>1</Pagination.Item>
                    <Pagination.Item>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                    <Pagination.Item className="pagination-next">next</Pagination.Item>
                  </Pagination>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <DeleteBroadcast
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

    </Fragment>
  )
}

export default WhatsappBroadcast