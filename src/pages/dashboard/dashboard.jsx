import React, { useContext, useState } from 'react';
import './dashboard.style.scss';

import InventoryIcon from '@mui/icons-material/Inventory';
import SellIcon from '@mui/icons-material/Sell';
import PeopleIcon from '@mui/icons-material/People';
import { UserContext } from '../../context/user-context';
import { ShopContext } from '../../context/shop-context';
import UserInfoBar from '../../components/user-info-bar/user-info-bar.component';
import ProductBar from '../../components/product-bar/product-bar.component';

function Dashboard() {
    const [selectedStat, setSelectedStat] = useState('Users');

    const { userList } = useContext(UserContext);

    const { products } = useContext(ShopContext);

    return (
        <div className='dashboard-container'>
            <h1 className="page-title">Dashboard</h1>

            <div className="dashboard-main">
                <div className="dashboard-data">
                    <h1>{selectedStat}</h1>

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
                                    key={product.uid} 
                                    product={product} 
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
                            <span>3</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
