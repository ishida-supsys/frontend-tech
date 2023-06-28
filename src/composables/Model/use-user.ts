import { computed, unref } from "vue";
import axios from "axios";
import { useMutation, useQuery } from "vue-query"; 
import { MaybeRef } from "@vueuse/core";

export const useFetchUsers = ()=>{
  return useQuery('users', async ()=>{
    const { data } = await axios.get('/users');
    return data;
  });
}

export const useCreateUser = ()=>{
  return useMutation(async ()=>{
    const { data } = await axios.post('/users');
    return data;
  })
}

export const useFetchUser = (id: MaybeRef<number>)=>{
  return useQuery(['user', computed(()=>unref(id))], async ()=>{
    const { data } = await axios.get(`/users/${unref(id)}`);
    return data;
  })
}

export const useUpdateUser = (id: MaybeRef<number>)=>{
  return useMutation(async ()=>{
    const { data } = await axios.put(`/users/${unref(id)}`);
    return data;
  })
}

export const useRemoveUser = (id: MaybeRef<number>)=>{
  return useMutation(async ()=>{
    const { data } = await axios.delete(`/users/${unref(id)}`);
    return data;
  })
}
