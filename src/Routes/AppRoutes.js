import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/UI/Navbar';
import Dashboard from '../Pages/Dashboard';
import Footer from '../Components/Footer';
import Department from '../Pages/Department';
import ParentCategory from '../Pages/ParentCategory';
import ChildCategory from '../Pages/ChildCategory';

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/department' element={<Department />} />
                    <Route path='/parentCategory' element={<ParentCategory />} />
                    <Route path='/childCategory' element={<ChildCategory />} />

                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;