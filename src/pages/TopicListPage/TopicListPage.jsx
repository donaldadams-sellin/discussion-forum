import TopicComponent from '../../components/TopicComponent/TopicComponent';
import './TopicListPage.css';

export default function TopicListPage({topics}) {
    

    return (
        <div className="TopicList">
            <h3>Browse to a topic to see what people are discussing!</h3>
            {topics.map((topic, idx)=><TopicComponent key={idx} idx={idx} topic={topic} />)}
        </div>
        
    )
}