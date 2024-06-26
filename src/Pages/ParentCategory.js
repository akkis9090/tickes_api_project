import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ParentCategory = () => {

    const [parentCategory, setParentCategory] = useState([]);
    const showParentCategoryData = async () => {
        const result = await axios.get('https://freeapi.gerasim.in/api/TicketsNew/GetParentCategory')
        setParentCategory(result.data.data)
        setIsLoader(false)
    }


    const [parentCategoryObj, setParentObj] = useState({
        "categoryId": 0,
        "categoryName": "",
        "deptId": 0
    })

    const saveParentCategory = async () => {
        try {
            const result = await axios.post('https://freeapi.gerasim.in/api/TicketsNew/CreateParentCategory', parentCategoryObj)
            if (result.data.result) {
                alert('Save Parent Category')
                showParentCategoryData()
                reset1()
                setisShowForm(false)
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
        }
    }

    const changeFormValue = (event, key) => {
        setParentObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }


    const editParentCategory = (item) => {
        setisShowForm(true)
        setParentObj(prevObj => ({
            ...prevObj, categoryId: item.categoryId,
            categoryName: item.categoryName,
            deptId: item.deptId
        }))

    }

    const updateParentCategory = async () => {
        try {
            const result = await axios.put('https://freeapi.gerasim.in/api/TicketsNew/UpdateParentCategory', parentCategoryObj)
            if (result.data.result) {
                alert("Update Parent Category")
                showParentCategoryData()
                reset1()
                setisShowForm(false)
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
        }
    }

    const deleteParentCategory = async (id) => {
        const isDelete = window.confirm("Do you want to Remove");
        if (isDelete) {
            const result = await axios.delete('https://freeapi.gerasim.in/api/TicketsNew/DeleteParentCategory?id=' + id)
            if (result.data.result) {
                alert("Delete Parent Category")
                showParentCategoryData()
            } else {
                alert(result.data.message)
            }
        }
    } 

    const reset1 = () => {
        setParentObj({
            "categoryId": 0,
            "categoryName": "",
            "deptId": 0
        })
    }

    // Display Department Data List
    const [departmentList, setDepartmentList] = useState([]);
    const showDepartmentData = async () => {
        const result = await axios.get("https://freeapi.miniprojectideas.com/api/TicketsNew/GetDepartments")
        setDepartmentList(result.data.data)
        setIsLoader(false)
    }

    useEffect(() => {
        showParentCategoryData()
        showDepartmentData()
    }, [])



    // Loaders
    let [isLoader, setIsLoader] = useState(true);

    // Show And Hide
    let [isShowForm, setisShowForm] = useState(false);
    let [isShowCard, setisShowCard] = useState(false);
    const showForm = () => {
        setisShowForm(true);
    }

    const closeForm = () => {
        reset1()
        setisShowForm(false);
    }

    const showCard = () => {
        setisShowCard(true);
    }

    const showTable = () => {
        setisShowCard(false);
    }
    return (
        <div>
            <div className='container m-auto mt-5'>
                {!isShowForm &&
                    <div className='card'>
                        <div className='card-title text-center mt-4'>
                            <h1>Parent Category Listing</h1>
                        </div>
                        <div className='card-body'>
                            <div >
                                <Link className='btn btn-success ' onClick={showForm}>Add Data</Link>
                                {!isShowCard && (
                                    <button className='btn btn-body btn-success m-2' onClick={showCard}>card</button>
                                )}

                                {isShowCard && (
                                    <button className='btn btn-body  btn-success m-2' onClick={showTable}>Table</button>
                                )}
                            </div>
                            <table className='table table-bordered mt-4' >
                                <thead >
                                    <tr>
                                        <th>Sr No</th>
                                        <th>categoryName</th>
                                        <th>deptName</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {
                                    isLoader && <tbody>
                                        <tr>
                                            <td colSpan={12} className='text-center'>
                                                <div class="spinner-border text-muted"></div>
                                                <div class="spinner-border text-primary"></div>
                                                {/* <div class="spinner-border text-success"></div>
                                                    <div class="spinner-border text-info"></div>
                                                    <div class="spinner-border text-warning"></div>
                                                    <div class="spinner-border text-danger"></div>
                                                    <div class="spinner-border text-secondary"></div>
                                                    <div class="spinner-border text-dark"></div>
                                                    <div class="spinner-border text-light"></div> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                                <tbody>
                                    {parentCategory &&
                                        parentCategory.map((item, index) => (
                                            <tr key={item.categoryId}>
                                                <td>{index + 1}</td>
                                                <td>{item.categoryName}</td>
                                                <td>{item.deptName}</td>
                                                <td>
                                                    <Link className='btn btn-primary m-2' onClick={() => { editParentCategory(item) }}><FaEdit /></Link>
                                                    <Link className='btn btn-danger m-2' onClick={() => { deleteParentCategory(item.categoryId) }}><FaTrashAlt /></Link>
                                                    {/* <Link className='btn btn-primary m-2' onClick={() => { DetailsDepartment(item) }}><CgDetailsMore /></Link> */}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }


                {isShowForm &&
                    <div className='row  m-auto mt-5'>
                        <div className='offset-lg-3 col-lg-6'>
                            <form className='container'>
                                <div className='card'>
                                    <div className='card-title text-center mt-4'>
                                        <h1>Parent Category </h1>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-lg-12'>

                                                {/* <div className='form-group'>
                                                    <label>ID</label>
                                                    <input disabled="disabled" className='form-control'></input>
                                                </div> */}

                                                <div className='form-group'>
                                                    <label>Category Name</label>
                                                    <input type='text' className='form-control' value={parentCategoryObj.categoryName} onChange={(event) => { changeFormValue(event, 'categoryName') }}></input>
                                                </div>

                                                <div className='form-group'>
                                                    <label>Department Name</label>
                                                    <select className='form-select' value={parentCategoryObj.deptId} onChange={(event) => { changeFormValue(event, 'deptId') }}>
                                                        <option>Choose Department</option>
                                                        {
                                                            departmentList.map((item) => {
                                                                return (<option value={item.deptId}>{item.deptName}</option>)
                                                            })
                                                        }
                                                    </select>
                                                </div>



                                                {/* <div className="col-lg-12">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input"></input>
                                                        <label className="form-check-label">Is Active</label>
                                                    </div>
                                                </div> */}

                                                <div className='form-group '>
                                                    {parentCategoryObj.categoryId === 0 && <Link className="btn btn-primary m-2" onClick={saveParentCategory}>Save Data</Link>}
                                                    {parentCategoryObj.categoryId !== 0 && <Link className="btn btn-warning m-2" onClick={updateParentCategory}>Update Data</Link>}
                                                    <Link onClick={closeForm} className='btn btn-danger m-2'>Back</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                }

                {/* {isShowForm &&
                    <div className='container  m-auto mt-5 w-50'>
                        <div className='card'>
                            <div className='card-title text-center mt-4'>
                                <h1>Employee Details</h1>
                            </div>
                            <div className='card-body mx-4'>

                                {departmentObj &&
                                    <div>
                                        <h4><b>The Employee Name is:</b> {departmentObj.deptId}</h4>
                                        <h4><b>Email is:</b> {departmentObj.deptName}</h4>
                                        <h4><b>Phone is:</b> {departmentObj.createdDate}</h4>
                                        <Link to='/employee' className='btn btn-danger mt-4'>Back</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                } */}
            </div>
        </div>
    );
};

export default ParentCategory;