import axios from "axios";
import React, { useEffect, useState } from "react";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link } from 'react-router-dom';

function Pagination({ count }) { 
    const [page, setPage] = useState(1);
    const [personscount, setpersonscount] = useState(0);
    const [optionvalue, setoptionvalue] = useState('');
    const [forrowpaginate, setstateforrowpaginate] = useState('');
    const [persons, setpersons] = useState([]);
    useEffect(() => {
        if (count) 
        { 
            setpersonscount(count);
        }  
    });

    const paginationfunction = (page) => {

        // main pagination
        let formdata = new FormData();
        formdata.append('pagenumber', page);
        // formdata.append('count_per_page', optionvalue);

        axios.post('https://admin.myhomekeeper.co/api/homekeepergetalluserslistpaginate', formdata)
            .then(response => {
                const personss = response.data.getuserlists;
                console.log("persondata", personss)
                let data = [];
                for (let index = 0; index < personss.length; index++) {
                    data.push({
                        id: index + 1,
                        username: <Link to={"/admin/usersingle/" + personss[index].id}>{personss[index].name}</Link>,
                        usertype: personss[index].usertype,
                        pays: '08-07-2022',
                        accountstatus: <Link to={"/admin/usersingle/" + personss[index].id} className="regi">Registered</Link>,
                        phone: personss[index].cellnumber,
                        emailaddress: personss[index].email,
                    })
                }
                setpersons(data);
                setpersonscount(data.length);
                console.log("thisdataforadminlist", data);
            })
    }



    // console.log('title',title);
    const test="test";
    return (<>

        <PaginationControl
            page={forrowpaginate ? forrowpaginate : page}
            between={0}
            total={personscount ? personscount : 0}
            limit={optionvalue ? optionvalue : 10}
            
            //   limit={20}

            changePage={(page) => {

                 setPage(page);
                 paginationfunction(page)
            }}
            ellipsis={1}
        />
    </>)
}

export default Pagination;