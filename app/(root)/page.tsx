import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const loggedIn = { firstName: 'Brad', lastName: 'Ichikawa', email: 'bxii.v.1@proton.me' };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome,"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions effortlessly."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>

        <h2 className="recent-transactions">Recent Transactions</h2>
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ $id: '1', currentBalance: 123.50 }, { $id: '2', currentBalance: 500.50 }]}
      />
    </section>
  );
}

export default Home;
