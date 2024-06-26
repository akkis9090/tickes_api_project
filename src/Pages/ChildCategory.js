import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ChildCategory = () => {
    const [childCategoryList, setChildCategoryList] = useState([]);
    const showChildCategory = async () => {
        const result = await axios.get("https://freeapi.miniprojectideas.com/api/TicketsNew/GetChildCategory");
        setChildCategoryList(result.data.data)
        setIsLoader(false)
    }

    const [ParentCategoryList, setParentCategoryList] = useState([]);
    const showParentCategoryList = async () => {
        const result = await axios.get("https://freeapi.miniprojectideas.com/api/TicketsNew/GetChildCategory")
        setParentCategoryList(result.data.data)
    }

    const [childCategoryObj, setCategoryObj] = useState({
        "childCategoryId": 0,
        "categoryName": "",
        "parentCategoryId": 0
    })
    const saveChildCategory = async () => {
        try {
            const result = await axios.post('https://freeapi.miniprojectideas.com/api/TicketsNew/CreateChildCategory', childCategoryObj)
            if (result.data.result) {
                alert('Save Child Category')
                showChildCategory()
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
        setCategoryObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const editChildCategory = (item) => {
        setisShowForm(true)
        setCategoryObj(prevObj => ({
            ...prevObj, childCategoryId: item.childCategoryId,
            categoryName: item.categoryName,
            parentCategoryId: item.parentCategoryId
        }))
    }

    const updateChildCategory = async () => {
        try {
            const result = await axios.put('https://freeapi.miniprojectideas.com/api/TicketsNew/UpdateChildCategory', setCategoryObj)
            if (result.data.result) {
                alert("Update Child Category")
            } else {
                alert(result.data.message)
            }
        } catch (error) {
            alert(error.code)
        }
    }


    const deleteChildCategory = async (id) => {
        const isDelete = window.confirm('Do you want to delete')
        if (isDelete) {
            const result = await axios.delete('https://freeapi.miniprojectideas.com/api/TicketsNew/DeleteChildCategory?id=' + id)
            if (result.data.result) {
                alert("Delete")
                showChildCategory()
            } else {
                alert(result.data.message)
            }
        }
    }

    useEffect(() => {
        showChildCategory();
        showParentCategoryList()
    }, [])

    const reset1 = () => {
        setCategoryObj({
            "childCategoryId": 0,
            "categoryName": "",
            "parentCategoryId": 0
        })
    }

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

        <div className='container m-auto mt-5'>
            {!isShowForm &&
                <div className='card'>
                    <div className='card-title text-center mt-4'>
                        <h1>Child Category Listing</h1>
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
                                    <th>parentCategoryName</th>
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
                                {childCategoryList &&
                                    childCategoryList.map((item, index) => (
                                        <tr key={item.childCategoryId}>
                                            <td>{index + 1}</td>
                                            <td>{item.categoryName}</td>
                                            <td>{item.parentCategoryName}</td>
                                            <td>
                                                <Link className='btn btn-primary m-2' onClick={() => { editChildCategory(item) }}><FaEdit /></Link>
                                                <Link className='btn btn-danger m-2' onClick={() => { deleteChildCategory(item.childCategoryId) }} ><FaTrashAlt /></Link>
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
                                    <h1>Child Category </h1>
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
                                                <input type='text' className='form-control' value={childCategoryObj.categoryName} onChange={(event) => { changeFormValue(event, 'categoryName') }}></input>
                                            </div>

                                            <div className='form-group'>
                                                <label>Parent Category Name</label>
                                                <select className='form-select' value={childCategoryObj.parentCategoryId} onChange={(event) => { changeFormValue(event, 'parentCategoryId') }}>
                                                    <option>Choose Parent Category</option>
                                                    {
                                                        ParentCategoryList.map((item) => {
                                                            return (<option value={item.parentCategoryId}>{item.parentCategoryName}</option>)
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
                                                {childCategoryObj.childCategoryId === 0 &&
                                                    <Link className="btn btn-primary m-2" onClick={saveChildCategory}>Save Data</Link>
                                                }
                                                {childCategoryObj.childCategoryId !== 0 &&
                                                    <Link className="btn btn-warning m-2" onClick={updateChildCategory} >Update Data</Link>
                                                }
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
    );
};

export default ChildCategory;