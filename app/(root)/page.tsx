import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  let loggedIn;
  try {
    loggedIn = await getLoggedInUser();
  } catch (error) {
    console.error("Failed to get logged in user", error);
    return (
      <div>
        <p>Error: Unable to get logged in user</p>
      </div>
    );
  }

  if (!loggedIn || !loggedIn.$id) {
    console.error("Logged in user or user ID is null or undefined");
    return (
      <div>
        <p>Error: User not logged in</p>
      </div>
    );
  }

  let accounts;
  try {
    accounts = await getAccounts({ 
      userId: loggedIn.$id 
    });
  } catch (error) {
    console.error("Failed to get accounts", error);
    return (
      <div>
        <p>Error: Unable to get accounts</p>
      </div>
    );
  }

  if (!accounts || !accounts.data || accounts.data.length === 0) {
    console.error("Accounts data is null or empty");
    return (
      <div>
        <p>Error: No accounts found</p>
      </div>
    );
  }

  const accountsData = accounts.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  if (!appwriteItemId) {
    console.error("Appwrite Item ID is null or undefined");
    return (
      <div>
        <p>Error: No appwrite item ID found</p>
      </div>
    );
  }

  let account;
  try {
    account = await getAccount({ appwriteItemId });
  } catch (error) {
    console.error("Failed to get account", error);
    return (
      <div>
        <p>Error: Unable to get account data</p>
      </div>
    );
  }

  if (!account || !account.transactions) {
    console.error("Account or transactions data is null or undefined");
    return (
      <div>
        <p>Error: No account or transactions data found</p>
      </div>
    );
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={account.transactions}
        banks={accountsData.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
