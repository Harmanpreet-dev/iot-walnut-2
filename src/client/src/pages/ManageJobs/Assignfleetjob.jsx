import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";



const Assignfleetjob = () => {

    const navigate = useNavigate();
    return (
        
        <>
            <div className="content-wrapper bg-base-200">
                <div className="flex items-center justify-between">
                    <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
                        <ul>
                            <li className="text-base-content text-[18px]">
                                <Link to='/jobs'><IoIosArrowBack  className='mr-3'/>Go Back </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Assign Fleets start */}

                <div className="flex items-center justify-between flex-col my-10">
                    <div className='text-[29px] font-[500] landing-[29px] text-center'>
                    Select Fleet for New Job
                    </div>
                    <div className="flex items-center">
                        <div className='form-control flex flex-row items-center rounded-[10px] border border-base-content/20 px-2 mx-4  my-10 bg-base-100'>
                            <CiSearch className='text-[25px]' />
                            <input className='input rounded w-[23rem] text-[16px] focus:outline-none focus:border-none focus:outline-offset-none' placeholder='Search Fleet..' />
                        </div>

                    </div>
                    <div className='flex items-center justify-end w-full flex-wrap '>
                            <button className="btn bg-slate-400 text-slate-50 text-[16px] font-[500] landing-[19px] border rounded-xl w-40 hover:bg-slate-950" onClick={() => navigate('/createjob')}>Continue</button>
                    </div>
                </div>

                {/* Table Start */}

                <div className="mt-6">
                    <div className="col-12">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className='border-b-2 border-base-300'>
                                    <tr className='text-[#B1B1B1] text-[15px] font-[700] landing-[35px] '>
                                        <th className='w-2'>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th>Fleet Name</th>
                                        <th>Category</th>
                                        <th><span className='flex'><GoDotFill className='text-[#51DCA8] mr-1' />Active Devices</span></th>
                                        <th><span className='flex'><GoDotFill className='text-[#FF2002] mr-1' />Inactive Devices</span></th>
                                        <th>Admin</th>
                                        <th>Admin Phone</th>
                                    </tr>
                                </thead>
                                <br />
                                <tbody className='mt-3'>
                                    {/* row 1 */}

                                    <tr className='shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20'>
                                        <th className='shadow-none cursor-pointer'>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>

                                        <td className='bg-base-100 rounded-l-[15px] cursor-pointer'>
                                            <div className="flex items-center gap-3">
                                                <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">Fleet 1</div>
                                            </div>
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer'>
                                            Solar
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer'>
                                            19,899
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer'>
                                            0,189
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer'>
                                        Amol Bhardwaj
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px]'>
                                     99887 76655
                                        </td>
                                    </tr>
                                    <br />
                                    <tr className='shadow-[0_3.5px_5.5px_0_#00000005] mb-3 h-20'>
                                        <th className='shadow-none cursor-pointer'>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>

                                        <td className='bg-base-100 rounded-l-[15px] cursor-pointer'>
                                            <div className="flex items-center gap-3">
                                                <div className="font-bold text-base-500 font-[900] text-[19px] landing-[35px]">Fleet 2</div>
                                            </div>
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer'>
                                            Solar
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer'>
                                            19,899
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer'>
                                            0,189
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer'>
                                        Ajay
                                        </td>
                                        <td className='text-[16px] font-[500] landing-[35px] bg-base-100 cursor-pointer rounded-r-[15px]'>
                                     99887 76655
                                        </td>
                                    </tr>
                                    <br />
                                </tbody>
                                
                            </table>
                        </div>
                    </div>

                    {/* Table End */}


                </div>
            </div>
        </>
    )
}

export default Assignfleetjob;