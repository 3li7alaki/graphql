import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import Card from "@/components/dashboard/Card";
import {useEffect, useState} from "react";
import {StrictModeDroppable} from "@/components/StrictModeDroppable";
import Progress from "@/components/dashboard/Progress";
import Personal from "@/components/dashboard/Personal";
import Audit from "@/components/dashboard/Audit";
import Xp from "@/components/dashboard/Xp";
import Skills from "@/components/dashboard/Skills";

export default function Home() {
    const [leftCards, setLeftCards] = useState([
        { id: '1', content: <Personal />, header: 'None' },
        { id: '2', content: <Xp />, header: 'XP Progression' },
        { id: '3', content: <Audit />, header: 'Audit Stats'  },
    ]);

    const [rightCards, setRightCards] = useState([
        { id: '4', content: <Progress />, header: 'Progress' },
        { id: '5', content: <Skills />, header: 'Languages' },
    ]);

    // Function to handle drag-and-drop logic
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const sourceId = result.source.droppableId;
        const destinationId = result.destination.droppableId;

        // Handle moving items between lists
        if (sourceId !== destinationId) {
            const sourceCards = sourceId === 'left' ? leftCards : rightCards;
            const destinationCards = destinationId === 'left' ? leftCards : rightCards;
            const [movedCard] = sourceCards.splice(result.source.index, 1);

            // Add the moved card to the destination list
            destinationCards.splice(result.destination.index, 0, movedCard);

            // Add the bottom card to the source list
            // sourceCards.push(destinationCards.splice(result.destination.index + 1, 1)[0]);

            // Update the state
            if (sourceId === 'left') {
                setLeftCards(sourceCards);
                setRightCards(destinationCards);
            } else {
                setRightCards(sourceCards);
                setLeftCards(destinationCards);
            }
        } else {
            // Handle reordering within the same list
            const cards = sourceId === 'left' ? Array.from(leftCards) : Array.from(rightCards);
            const [movedCard] = cards.splice(result.source.index, 1);
            cards.splice(result.destination.index, 0, movedCard);

            // Update the state
            if (sourceId === 'left') {
                setLeftCards(cards);
            } else {
                setRightCards(cards);
            }
        }
    };

    return (
        <div className="flex flex-col h-full justify-center items-center">
            <div className="flex-grow overflow-hidden w-1/2">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className="flex h-full space-x-4 overflow-hidden">
                        {['left', 'right'].map((side) => (
                            <StrictModeDroppable key={side} droppableId={side} type="vertical">
                                {(provided) => (
                                    <div
                                        className="flex-1 overflow-y-auto overflow-x-hidden h-full pb-4 hide-scroll"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {(side === 'left' ? leftCards : rightCards).map(({ id, content, header }, index) => (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="p-2 mb-2"
                                                    >
                                                        <Card header={header}>{content}</Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </StrictModeDroppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}
