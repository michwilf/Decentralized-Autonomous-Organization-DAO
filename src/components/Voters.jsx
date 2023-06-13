import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { Link, useParams } from 'react-router-dom'
import { listVoters } from '../Blockchain.services'

const Voters = () => {
    const [voters, setVoters] = useState([]);
  const [data, setData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('all');
  const { id } = useParams();
  const timeAgo = (timestamp) => moment(Number(timestamp + '000')).fromNow();

  useEffect(async () => {
    await listVoters(id).then((res) => {
      setVoters(res);
      setData(res);
    });
  }, [id]);

  const getAll = () => {
    setVoters(data);
    setSelectedButton('all');
  };

  const getAccepted = () => {
    setVoters(data.filter((vote) => vote.choosen));
    setSelectedButton('acceptees');
  };

  const getRejected = () => {
    setVoters(data.filter((vote) => !vote.choosen));
    setSelectedButton('rejectees');
  };

  const active = ` bg-blue-600 inline-block px-6 py-2.5  dark:border
    text-white font-medium text-xs leading-tight uppercase
       dark:shadow-transparent hover:bg-blue-700 hover:dark:border-white transition
       duration-150 ease-in-out border-blue-600  hover:dark:text-white border border-blue-600`;

  const deactive = `dark:bg-transparent inline-block px-6 py-2.5  dark:border
       text-blue-600 border border-blue-600 font-medium text-xs leading-tight uppercase dark:shadow-transparent hover:bg-blue-600 dark:hover:bg-blue-600 transition
       duration-150 ease-in-out border-blue-600 hover:text-white hover:dark:text-white dark:border-blue-500 dark:text-blue-600 dark:text-blue-600`;

  return (
    <div className="flex flex-col p-8">
      <div className="flex justify-center items-center" role="group">
        <button
          onClick={getAll}
          className={`rounded-l-full ${
            selectedButton === 'all' ? active : deactive
          }`}
        >
          All
        </button>
        <button
          onClick={getAccepted}
          className={`${deactive} ${
            selectedButton === 'acceptees' ? active : ''
          }`}
        >
          Acceptees
        </button>
        <button
          onClick={getRejected}
          className={`rounded-r-full ${
            selectedButton === 'rejectees' ? active : deactive
          }`}
        >
          Rejectees
        </button>
          </div>
          <div className="overflow-x-auto">
              <div className="py-2 inline-block min-w-full">
                  <div className="h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md">
                      <table className="min-w-full">
                          <thead className="border-b dark:border-gray-500">
                              <tr>
                                  <th scopr="col" className="text-sm font-medium px-6 py-4 text-left">
                                      Voter
                                  </th>
                                  <th scopr="col" className="text-sm font-medium px-6 py-4 text-left">
                                      Voted
                                  </th>
                                  <th scopr="col" className="text-sm font-medium px-6 py-4 text-left">
                                      Vote
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              {voters.map((voter, i) => (
                                  <Voter key={i} vote={voter} />
                                ))}
                          </tbody>
                      </table>
                  </div>
              </div>
              <div className='mt-4 text-center py-2'>
                  <button className="bg-blue-600 inline-block px-6 py-2.5  dark:border
            text-white font-medium text-xs leading-tight uppercase rounded-full
                dark:shadow-transparent hover:bg-blue-700 hover:dark:bg-blue-700 transition
                duration-150 ease-in-out hover:dark:text-white border border-blue-600 dark:bg-transparent dark:text-blue-600">
                      Load More
                    </button>
              </div>
          </div>
    </div>
  )
}

const Voter = ({ vote, key }) => {
    const timeAgo = (timestamp) => moment(Number(timestamp + '000')).fromNow()

    return (<tr>
                                 
                                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                  <div className="flex justify-start items-center space-x-2">
                                      <Avatar className="rounded-full shadow-md text-md" name={vote.voter} size="30" textSizeRatio="75%" round={true} />
                <span className="ml-2">{truncate(vote.voter, 4,4,11)}</span>
                                          </div>
                                      </td>
                                      
                                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                      {timeAgo(vote.timestamp)}
                                  </td>
        <td className="text-sm font-light px-6 py-4 whitespace-nowrap space-x-2">
            {voter.choosen ? (
                <button className="bg-blue-600 inline-block px-6 py-2.5  dark:border
            text-white font-medium text-xs leading-tight uppercase rounded-full
                dark:shadow-transparent hover:bg-blue-700 hover:dark:border-white transition
                duration-150 ease-in-out hover:dark:text-white border border-blue-600">
                                                        Accepted
                                                </button>
            ) : (
                <button className="bg-red-600 inline-block px-6 py-2.5  dark:border
            text-white font-medium text-xs leading-tight uppercase rounded-full
                dark:shadow-transparent hover:bg-red-700 hover:dark:border-white transition
                duration-150 ease-in-out hover:dark:text-white border border-red-600">
                                                        Rejected
                                                        </button>     
            )}                 
                                  </td>
                              </tr>)
}

export default Voters