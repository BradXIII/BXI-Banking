import React from 'react';
import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome,"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transactions effortlessly."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1234.12}
          />
        </header>

        <h2 className="recent-transactions">Recent Transactions</h2>
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ $id: '1', currentBalance: 123.45 }, { $id: '2', currentBalance: 678.90 }]}
      />
    </section>
  );
}

export default Home;
