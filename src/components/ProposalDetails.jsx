import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { daysRemaining, useGlobalState } from '../store'
import { toast } from 'react-toastify'
import { getProposal, voteOnProposal } from '../Blockchain.services'

const ProposalDetails = () => {
    const { id } = useParams()
    const [proposal, setProposal] = useState(null)
    const [data, setData] = useState([])
    const [isStakeholder] = useGlobalState('isStakeholder')

    const retrieveProposal = async () => {
        await getProposal(id).then((res) => {
            setProposal(res)
            setData([
                { name: 'Voters', Acceptees: res?.upvotes, Rejectees: res?.downvotes },
            ])
        })
    }

    useEffect(() => {
        retrieveProposal()
    }, [])

   

    const onVote = async (choice) => {
        if (new Date().getTime() > Number(proposal.duration + '000')) {
            toast.warning('Proposal has expired!')
            return
        }

        await voteOnProposal(id, choice)
        toast.success('Vote successfully cast!')
    }

  return (
      <div className='p-8'>
          <h2 className="font-semibold text-3xl mb-5">{proposal?.title}</h2>
          <p>
              This proposal is to payout <strong>{proposal?.amount} ETH</strong> and currently have {' '}
              <strong>{proposal?.upvotes + proposal?.downvotes} votes</strong> and will expire in <strong>{daysRemaining(proposal?.duration)} days</strong>
          </p>
          <hr className="my-6 border-gray-300 dark-:border-gray-500 " />
          <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className="flex justify-start items-center w-full mt-4 overflow-auto">
              <BarChart width={730} height={250} data={data} margin={{ left: -55 }} >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Acceptees" fill="#2563eb" />
                  <Bar dataKey="Rejectees" fill="#dc2626" />
                </BarChart>
          </div>
          <div className="flex justify-start items-center space-x-3 mt-4" role="group">
              {isStakeholder ? (
                  <>
                  <button type='button' onClick={() => onVote(true)} className='
              dark:bg-transparent inline-block px-6 py-2.5  dark:border
    text-blue-600 border border-blue-600 font-medium text-xs leading-tight uppercase dark:shadow-transparent hover:bg-blue-600 dark:hover:bg-blue-600 transition
    duration-150 ease-in-out rounded-full hover:dark:text-white dark:border-blue-500 dark:text-blue-600 
              '>
                  Accept
              </button>
              <button type='button' onClick={() => onVote(false)} className='
              dark:bg-transparent inline-block px-6 py-2.5  dark:border
    text-red-600 border border-red-600 font-medium text-xs leading-tight uppercase dark:shadow-transparent hover:bg-red-600 dark:hover:bg-red-600 transition
    duration-150 ease-in-out rounded-full hover:dark:text-white dark:border-red-500 dark:text-red-600 
              '>
                  Reject
              </button>
                  </>
             ) : null}
          </div>
    </div>
  ) 
}

export default ProposalDetails