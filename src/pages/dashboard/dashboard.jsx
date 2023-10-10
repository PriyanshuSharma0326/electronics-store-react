import React, { useContext } from 'react';
import './dashboard.style.scss';
import InventoryIcon from '@mui/icons-material/Inventory';
import SellIcon from '@mui/icons-material/Sell';
import PeopleIcon from '@mui/icons-material/People';
import { UserContext } from '../../context/user-context';
import { ShopContext } from '../../context/shop-context';
import UserInfoBar from '../../components/user-info-bar/user-info-bar.component';
import ProductBar from '../../components/product-bar/product-bar.component';
import Button from '../../components/button/button.component';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../../context/dashboard-context';
import ConfirmationBox from '../../components/confirmation-box/confirmation-box.component';
import OrderInfoBarDashboard from '../../components/order-info-bar-dashboard/order-info-bar-dashboard';
import { Error } from '../../constants';

function Dashboard() {
    const navigate = useNavigate();

    const { userList, userDoc } = useContext(UserContext);

    const { products, orders } = useContext(ShopContext);

    const { isBoxOpen, selectedStat, setSelectedStat } = useContext(DashboardContext);

    const goToAddProduct = () => {
        navigate('/dashboard/add-product');
    }

    return (
        <>
            {userDoc.admin ? 
                <div className='dashboard-container'>
                    <h1 className="page-title">Dashboard</h1>

                    <div className="dashboard-main">
                        <div className="dashboard-data">
                            <div className="dashboard-title">
                                <h1>{selectedStat}</h1>

                                {selectedStat === 'Products' && <Button 
                                    type='button' 
                                    buttonText='Add Product' 
                                    onClick={goToAddProduct} 
                                />}
                            </div>

                            {selectedStat === 'Users' && <div className="users">
                                {userList.map(user => {
                                    return (
                                        <UserInfoBar 
                                            key={user.uid} 
                                            user={user} 
                                        />
                                    )
                                })}
                            </div>}

                            {selectedStat === 'Products' && <div className="products">
                                {products.map(product => {
                                    return (
                                        <ProductBar 
                                            key={product.id} 
                                            product={product} 
                                        />
                                    )
                                })}
                            </div>}

                            {selectedStat === 'Orders' && <div className="orders">
                                {orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map(order => {
                                    return (
                                        <OrderInfoBarDashboard 
                                            key={order.orderID} 
                                            orderInfo={order} 
                                        />
                                    )
                                })}
                            </div>}
                        </div>

                        <div className="stats">
                            <h1 className="stats-section-title">Stats</h1>

                            <div 
                                className={`stat-box${selectedStat === 'Users' ? ' active' : ''}`} 
                                onClick={() => setSelectedStat('Users')} 
                            >
                                <div className="icon">
                                    <PeopleIcon />
                                </div>
                                <div className="stat-count">
                                    <p>Users</p>
                                    <span>{userList?.length}</span>
                                </div>
                            </div>

                            <div 
                                className={`stat-box${selectedStat === 'Products' ? ' active' : ''}`} 
                                onClick={() => setSelectedStat('Products')} 
                            >
                                <div className="icon">
                                    <InventoryIcon />
                                </div>
                                <div className="stat-count">
                                    <p>Products</p>
                                    <span>{products?.length}</span>
                                </div>
                            </div>

                            <div 
                                className={`stat-box${selectedStat === 'Orders' ? ' active' : ''}`} 
                                onClick={() => setSelectedStat('Orders')} 
                            >
                                <div className="icon">
                                    <SellIcon />
                                </div>
                                <div className="stat-count">
                                    <p>Orders</p>
                                    <span>{orders?.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isBoxOpen &&  <ConfirmationBox />}
                </div> : 
                <Error />
            }
        </>
    )
}

export default Dashboard;
