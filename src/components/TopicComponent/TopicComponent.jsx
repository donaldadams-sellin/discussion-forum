import './TopicComponent.css';

export default function TopicComponent({topic}){
    return(
        <div className="TopicComponent">
            <p className="TopicName">{topic.name}</p>
            <p className="TopicDescription">{topic.description}</p>
        </div>
    )
}