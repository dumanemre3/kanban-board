import React, {useEffect, useState} from 'react';
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import styled from 'styled-components';
import "./BoardDetail.css"

import {Box, Divider} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {deleteList} from "../../services/api";

const SortableListContainer = styled.ul`
	display: flex;
	height: auto;
	overflow-x: auto;
	padding: 0;
	user-select: none;
	width: 100%;
	-webkit-overflow-scrolling: touch;
`;

function handleDeleteList(event,item,index,items,setListsState) {
    event.preventDefault();
    deleteList(item.id).then((response) => {
        items.splice(index,1);
        setListsState(items);
    })
}

const SortableItem = SortableElement(({value,items,index,handleDelete}) => (
    <Box className={"List-parent"} component={"span"} mr={4}>
        <div style={{"float": "right"}} className={"p-3"}>
            <div onClick={(event) => handleDelete(event,value,index)}>
                <DeleteIcon fontSize={"small"} className="control-icon delete-icon"/>
            </div>
            <EditIcon fontSize={"small"} className="mx-2 control-icon edit-icon"/>
        </div>
        <div className={"list-title"}>
            {value.title}
        </div>
        <div style={{"clear": "both"}} />
        <Divider />
    </Box>
));

const SortableList = SortableContainer(({ items,handleDelete }) => (
    <SortableListContainer>
        {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} items={items} handleDelete={handleDelete} />
        ))}
    </SortableListContainer>
));

const SortableComponent = ({lists}) => {
    const [listsState, setListsState] = useState(lists);

    const handleDeleteList = (event,item,index) => {
        event.preventDefault();
        deleteList(item.id).then((response) => {
            const arrCopy = [...listsState];
            arrCopy.splice(index,1);
            setListsState(arrCopy);
        })
    };

    useEffect(() => {
        setListsState(lists);
    }, [lists]);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setListsState(arrayMove(listsState, oldIndex, newIndex));
    };

    return <SortableList axis="x" items={listsState} handleDelete={handleDeleteList} distance={1} onSortEnd={onSortEnd} />
}

export default SortableComponent;