import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './App.css';
import Dashboard from './Dashboard'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
const BarChart = ({ title, labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: title },
        },
      }}
      className="canvas"
    />
  );
};


export const App = () => {
  const [data, setData] = useState({});
  const [selectedTab, setSelectedTab] = useState('dataAnalytics');

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://api.socialverseapp.com/admin/dashboard');
      setData(response.data);
      console.log(response.data);
    }
    getData();
  }, [setData]);

  const formatChartData = (metricData) => {
    return {
      labels: metricData.map((entry) => entry.timestamp),
      data: metricData.map((entry) => entry.count),
    };
  };

  const dailyMetrics = data?.dashboard?.userMetrics?.daily?.chartData || [];
  const monthlyMetrics = data?.dashboard?.userMetrics?.monthly?.chartData || [];
  const dailyChartData = formatChartData(dailyMetrics);
  const monthlyChartData = formatChartData(monthlyMetrics);

  return (
    <div className='main-box'>
      <div className='left-section'>
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => setSelectedTab('dataAnalytics')}>Data Analytics</li>
          <li onClick={() => setSelectedTab('barCharts')}>Bar Charts</li>
          <li onClick={() => setSelectedTab('pieCharts')}>Pie Charts</li>
        </ul>
      </div>

      <div className='right-section'>
        {selectedTab === 'dataAnalytics' && (
          <div className='data1'>
            <div className='move'><h1>User Metrics</h1></div>
            <div className='left-box'>
              <div className='all-time'>
                <h3>All Time</h3>
                <p>Active Users: {data?.dashboard?.userMetrics?.allTime.activeUser}</p>
                <p>Creators: {data?.dashboard?.userMetrics?.allTime.creator}</p>
                <p>Total Users: {data?.dashboard?.userMetrics?.allTime.totalUser}</p>
                <p>Total Referrals: {data?.dashboard?.userMetrics?.allTime.totalReferral}</p>
              </div>
              <div className='daily'>
                <h3>Daily</h3>
                <p>Active Users: {data?.dashboard?.userMetrics?.daily.activeUser}</p>
                <p>Creators: {data?.dashboard?.userMetrics?.daily.creator}</p>
                <p>Total Users: {data?.dashboard?.userMetrics?.daily.totalUser}</p>
                <p>Total Referrals: {data?.dashboard?.userMetrics?.daily.totalReferral}</p>
              </div>
              <div className='monthly'>
                <h3>Monthly</h3>
                <p>Active Users: {data?.dashboard?.userMetrics?.monthly.activeUser}</p>
                <p>Creators: {data?.dashboard?.userMetrics?.monthly.creator}</p>
                <p>Total Users: {data?.dashboard?.userMetrics?.monthly.totalUser}</p>
                <p>Total Referrals: {data?.dashboard?.userMetrics?.monthly.totalReferral}</p>
              </div>
            </div>

            <div className='move'><h1>Engagement Metrics</h1></div>
            <div className='left-box'>
              <div className='all-time'>
                <h3>All Time</h3>
                <p>Total Notifications: {data?.dashboard?.engagementMetrics?.allTime.totalNotifications}</p>
                <p>Total Messages {data?.dashboard?.engagementMetrics?.allTime.totalMessage}</p>
                <p>Total Likes: {data?.dashboard?.engagementMetrics?.allTime.totalLikes}</p>
                <p>Total Views: {data?.dashboard?.engagementMetrics?.allTime.totalViews}</p>
              </div>
              <div className='daily'>
                <h3>Daily</h3>
                <p>Total Notifications: {data?.dashboard?.engagementMetrics?.daily.totalNotifications}</p>
                <p>Total Messages {data?.dashboard?.engagementMetrics?.daily.totalMessage}</p>
                <p>Total Users: {data?.dashboard?.engagementMetrics?.daily.totalLikes}</p>
                <p>Total Views: {data?.dashboard?.engagementMetrics?.daily.totalViews}</p>
              </div>
              <div className='monthly'>
                <h3>Monthly</h3>
                <p>Total Notifications: {data?.dashboard?.engagementMetrics?.monthly.totalNotifications}</p>
                <p>Total Messages {data?.dashboard?.engagementMetrics?.monthly.totalMessage}</p>
                <p>Total Users: {data?.dashboard?.engagementMetrics?.monthly.totalLikes}</p>
                <p>Total Views: {data?.dashboard?.engagementMetrics?.monthly.totalViews}</p>
              </div>
            </div>

            <div className='move'><h1>Content Metrics</h1></div>
            <div className='left-box'>
              <div className='all-time'>
                <h3>All Time</h3>
                <p>Total Category: {data?.dashboard?.contentMetrics?.allTime.totalCategory}</p>
                <p>Total Comments: {data?.dashboard?.contentMetrics?.allTime.totalComments}</p>
                <p>Total Posts Blocked: {data?.dashboard?.contentMetrics?.allTime.totalPostBlocked}</p>
                <p>Total Posts Deleted: {data?.dashboard?.contentMetrics?.allTime.totalPostDeleted}</p>
                <p>Total Posts Exit Count: {data?.dashboard?.contentMetrics?.allTime.totalPostExitCount}</p>
                <p>Total Posts Shares: {data?.dashboard?.contentMetrics?.allTime.totalPostShares}</p>
                <p>Total Posts: {data?.dashboard?.contentMetrics?.allTime.totalPosts}</p>
                <p>Total Views: {data?.dashboard?.contentMetrics?.allTime.totalViews}</p>
              </div>
              <div className='daily'>
                <h3>Daily</h3>
                <p>Total Category: {data?.dashboard?.contentMetrics?.daily.totalCategory}</p>
                <p>Total Comments: {data?.dashboard?.contentMetrics?.daily.totalComments}</p>
                <p>Total Posts Blocked: {data?.dashboard?.contentMetrics?.daily.totalPostBlocked}</p>
                <p>Total Posts Deleted: {data?.dashboard?.contentMetrics?.daily.totalPostDeleted}</p>
                <p>Total Posts Exit Count: {data?.dashboard?.contentMetrics?.daily.totalPostExitCount}</p>
                <p>Total Posts Shares: {data?.dashboard?.contentMetrics?.daily.totalPostShares}</p>
                <p>Total Posts: {data?.dashboard?.contentMetrics?.daily.totalPosts}</p>
                <p>Total Views: {data?.dashboard?.contentMetrics?.daily.totalViews}</p>
              </div><div className='monthly'>
                <h3>Monthly</h3>
                <p>Total Category: {data?.dashboard?.contentMetrics?.monthly.totalCategory}</p>
                <p>Total Comments: {data?.dashboard?.contentMetrics?.monthly.totalComments}</p>
                <p>Total Posts Blocked: {data?.dashboard?.contentMetrics?.monthly.totalPostBlocked}</p>
                <p>Total Posts Deleted: {data?.dashboard?.contentMetrics?.monthly.totalPostDeleted}</p>
                <p>Total Posts Exit Count: {data?.dashboard?.contentMetrics?.monthly.totalPostExitCount}</p>
                <p>Total Posts Shares: {data?.dashboard?.contentMetrics?.monthly.totalPostShares}</p>
                <p>Total Posts: {data?.dashboard?.contentMetrics?.monthly.totalPosts}</p>
                <p>Total Views: {data?.dashboard?.contentMetrics?.monthly.totalViews}</p>
              </div>
            </div>

            <div className='move'><h1>Blockchain Metrics</h1></div>
            <div className='left-box'>
              <div className='all-time'>
                <h3>All Time</h3>
                <p>Total Tokens: {data?.dashboard?.blockchainMetrics?.allTime.totalTokens}</p>
                <p>Total Wallet on Etherum: {data?.dashboard?.blockchainMetrics?.allTime.totalWalletOnEthereum}</p>
                <p>Total Wallet on Polygon: {data?.dashboard?.blockchainMetrics?.allTime.totalWalletOnPolygon}</p>
                <p>Total Wallet on Solana: {data?.dashboard?.blockchainMetrics?.allTime.totalWalletOnSolana}</p>
              </div>
              <div className='daily'>
                <h3>Daily</h3>
                <p>Total Tokens: {data?.dashboard?.blockchainMetrics?.daily.totalTokens}</p>
                <p>Total Wallet on Etherum: {data?.dashboard?.blockchainMetrics?.daily.totalWalletOnEthereum}</p>
                <p>Total Wallet on Polygon: {data?.dashboard?.blockchainMetrics?.daily.totalWalletOnPolygon}</p>
                <p>Total Wallet on Solana: {data?.dashboard?.blockchainMetrics?.daily.totalWalletOnSolana}</p>
              </div>
              <div className='monthly'>
                <h3>Monthly</h3>
                <p>Total Tokens: {data?.dashboard?.blockchainMetrics?.monthly.totalTokens}</p>
                <p>Total Wallet on Etherum: {data?.dashboard?.blockchainMetrics?.monthly.totalWalletOnEthereum}</p>
                <p>Total Wallet on Polygon: {data?.dashboard?.blockchainMetrics?.monthly.totalWalletOnPolygon}</p>
                <p>Total Wallet on Solana: {data?.dashboard?.blockchainMetrics?.monthly.totalWalletOnSolana}</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'barCharts' && (
          <div className='bcs'>
            <div className='bc' style={{ width: '500px', height: '370px' }}>
              <h2>Blockchain Metrics</h2>
              <BarChart
                title="Blockchain Wallets (All Time)"
                labels={['Ethereum', 'Polygon', 'Solana']}
                data={[
                  data?.dashboard?.blockchainMetrics?.allTime?.totalWalletOnEthereum || 0,
                  data?.dashboard?.blockchainMetrics?.allTime?.totalWalletOnPolygon || 0,
                  data?.dashboard?.blockchainMetrics?.allTime?.totalWalletOnSolana || 0,
                ]}
              />
            </div>

            <div className='bc' style={{ width: '500px', height: '370px' }}>
              <h2>User Metrics (All Time)</h2>
              <BarChart
                title="User Metrics (All Time)"
                labels={['Active Users', 'Creators', 'Total Users']}
                data={[
                  data?.dashboard?.userMetrics?.allTime?.activeUser || 0,
                  data?.dashboard?.userMetrics?.allTime?.creator || 0,
                  data?.dashboard?.userMetrics?.allTime?.totalUser || 0,
                ]}
              />
            </div>

            <div className='bc' style={{ width: '500px', height: '370px' }}>
              <h2>Engagement Metrics (All Time)</h2>
              <BarChart
                title="Engagement Metrics (All Time)"
                labels={['Likes', 'Messages', 'Notifications', 'Views']}
                data={[
                  data?.dashboard?.engagementMetrics?.allTime?.totalLikes || 0,
                  data?.dashboard?.engagementMetrics?.allTime?.totalMessage || 0,
                  data?.dashboard?.engagementMetrics?.allTime?.totalNotifications || 0,
                  data?.dashboard?.engagementMetrics?.allTime?.totalViews || 0,
                ]}
              />
            </div>

            <div className='bc' style={{ width: '500px', height: '370px' }}>
              <h2>Content Metrics (All Time)</h2>
              <BarChart
                title="Content Metrics (All Time)"
                labels={['Total Posts', 'Total Category', 'Total Post Exit Count', 'Total Post Shares', 'Total Views']}
                data={[
                  data?.dashboard?.contentMetrics?.allTime?.totalPosts || 0,
                  data?.dashboard?.contentMetrics?.allTime?.totalCategory || 0,
                  data?.dashboard?.contentMetrics?.allTime?.totalPostExitCount || 0,
                  data?.dashboard?.contentMetrics?.allTime?.totalPostShares || 0,
                  data?.dashboard?.contentMetrics?.allTime?.totalViews || 0,
                ]}
              />
            </div>

            <div className='bc' style={{ width: '500px', height: '370px' }}>
              <h2>Daily Active Users</h2>
              <BarChart title="Daily Active Users" labels={dailyChartData.labels} data={dailyChartData.data} />
            </div>

            <div className='bc' style={{ width: '500px', height: '370px' }}>
              <h2>Monthly Active Users</h2>
              <BarChart title="Monthly Active Users" labels={monthlyChartData.labels} data={monthlyChartData.data} />
            </div>
          </div>
        )}




        {selectedTab === 'pieCharts' && (
          <div className="pcs">
            <Dashboard data={data} />
          </div>
        )}
      </div>

    </div>
  )
}

