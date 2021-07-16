import { Typography, Layout } from 'antd';
import TodoList from './TodoList';
import './TodoList.css';

const { Title } = Typography;
const { Header, Content } = Layout;

function Home() {

  return (
    <Layout className="todo-list">
      <Header><Title level={2} className="todo-list__title">Todo list</Title></Header>
      <Layout>
        <Content>
         <TodoList />
        </Content>
      </Layout>
    </Layout>
  )
};

export default Home;