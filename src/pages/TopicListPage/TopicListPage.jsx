import TopicComponent from '../../components/TopicComponent/TopicComponent';
import './TopicListPage.css';

export default function TopicListPage({topics}) {
    

    return (
        <div className="TopicList">
            {topics.map((topic, idx)=><TopicComponent key={idx} topic={topic} />)}
        </div>
        
    )
}