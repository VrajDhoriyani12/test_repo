'use client'

import { getLanguageApi, searchLanguageApi } from '@/app/(components)/Configs/Utils/APIs/Admin_Apis';
import Pageheader from '@/shared/layouts-components/page-header/pageheader';
import Seo from '@/shared/layouts-components/seo/seo';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form, Spinner, Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import moment from 'moment'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Pagination from '../../../Pagination/pagination'
import DeleteLanguage from './DeleteLanguage';

const page = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [openDeleteModalStatus, setOpenDeleteModalStatus] = useState(false)
  const [languageID, seLanguageID] = useState()
  const [data, setData] = useState([])
  const [totalRecord, setTotalRecord] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [totalPage, setTotalPage] = useState<any>();
  const [prevSearch, setPrevSearch] = useState<any>();

  const getLanguage = async () => {
    setLoading(true)

    const response = await getLanguageApi(currentPage)
    if (response.status === 200) {
      setLoading(false)
      setData(response.data.language)
      setTotalRecord(response.data.totalCount)
    } else {
      setLoading(false)
      if (response.response?.status === 400 || response.response?.status === 422 || response.response?.status === 404) {
        toast.error(response.response?.data.message);
      } else {
        toast.error(response.response?.data.message);
      }
    }
  }

  useEffect(() => {
    if (!search) {
      getLanguage()
    }
  }, [search, currentPage, limit])

  const handleSearchFunction = async () => {
    setLoading(true)

    const response = await searchLanguageApi(search, currentPage)
    if (response.status === 200) {
      setLoading(false)
      setData(response.data.language)
      setTotalRecord(response.data.totalCount)
      setPrevSearch('')
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (search) {
      handleSearchFunction()
    }
  }, [currentPage])

  const handleSearch = (e: any) => {
    e.preventDefault();

    const hasChanged =
      prevSearch?.search !== search;

    if (hasChanged && (search)) {
      handleSearchFunction()
      setCurrentPage(1);
      setPrevSearch({ search })
    }
  }

  const handleResetFilter = () => {
    setSearch('')
  }

  const handleDelete = (id: any) => {
    setOpenDeleteModalStatus(true)
    seLanguageID(id)
  }

  useEffect(() => {
    if (totalRecord || totalRecord === 0) {
      const perPage = Math.ceil(totalRecord / limit);
      setTotalPage(perPage);
    }
  }, [totalRecord]);

  return (
    <Fragment>
      <Seo title='Language' />

      <Pageheader title="Language" currentpage="Language" />

      <div className='d-flex justify-content-end mb-3 gap-2'>
        <Button variant='success' onClick={() => router.push('/master/language/add')}>Add Language</Button>
        <Button variant='success' onClick={() => router.push('/master/language/add-bulk')}>Add Language XLSX File</Button>
      </div>

      <div>
        <Form className='searchMain align-items-end' onSubmit={handleSearch}>
          <div>
            <Form.Control type='text' placeholder='Language' value={search} onChange={(e: any) => setSearch(e.target.value)} />
          </div>

          <Button className='btn btn-light-info' type='submit'>Search</Button>
          <Button className='btn btn-light-info' onClick={handleResetFilter}>Reset</Button>
        </Form>
      </div>

      <div className="container-fluid">
        <Table className="text-nowrap table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col" className='text-center'>Language</th>
              <th scope="col" className='text-center'>Created Date</th>
              <th scope="col" className='text-end'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              !loading && data?.length > 0 ? (
                data.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className='text-center'>{item.name}</td>
                      <td className='text-center'>{moment(item.created_at).format('DD-MM-YYYY')} <br />
                        {moment(item.created_at).format('h:mm A')}
                      </td>
                      <td>
                        <div className="hstack gap-2 fs-15 justify-content-end">
                          <Link href={`/master/language/edit/${item.id}`} className="btn btn-icon btn-sm btn-info"><i className="ri-edit-line"></i></Link>
                          <Button className="btn btn-icon btn-sm btn-success" onClick={() => handleDelete(item.id)}>
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={12} className='text-center'>
                    {loading ? <Spinner color="primary" animation="border" /> : "No data found"}
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>

      {
        !loading && totalPage > 1 &&
        <Pagination
          totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage}
        />
      }

      <DeleteLanguage
        getLanguage={getLanguage}
        setOpenDeleteModalStatus={setOpenDeleteModalStatus}
        openDeleteModalStatus={openDeleteModalStatus}
        languageID={languageID}
      />

    </Fragment>
  )
}

export default page