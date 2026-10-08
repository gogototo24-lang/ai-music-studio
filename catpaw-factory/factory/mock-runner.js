window.CATPAW_FACTORY = (() => {
  const VERSION = "0.2";
  const pipelines = {
    A: {
      name: "貓掌江湖＋喵台灣",
      description: "題材／CANON→Prompt Pack→首幀→短片→聲音→審核",
      provider: "factory_mock_video",
      sample: {universe:"maozhang", subject:"舞魅喵", output:"9:16 short"}
    },
    B: {
      name: "成年時尚寫真",
      description: "成年虛構／授權角色→非露骨時尚寫真→挑圖→審核交付",
      provider: "factory_mock_image",
      sample: {universe:"fashion", subject:"adult fictional fashion model", output:"fashion image set"}
    },
    C: {
      name: "音樂 MV",
      description: "歌詞→聲線／BGM→Storyboard→素材→混音→MV→審核",
      provider: "factory_mock_mv",
      sample: {universe:"music", subject:"舞魅喵角色歌", output:"9:16 MV"}
    },
    D: {
      name: "長篇漫劇",
      description: "劇本→分集→分鏡→逐鏡 Mock→配音→分段合成→審核",
      provider: "factory_mock_drama",
      sample: {universe:"drama", subject:"貓掌江湖漫劇試播集", output:"episode plan"}
    }
  };

  const stepTemplates = {
    A:["validate","prompt_pack","first_frame","video_mock","audio_mock","review_gate"],
    B:["validate_adult_non_explicit","style_pack","image_batch_mock","quality_select","review_gate"],
    C:["validate","lyrics_pack","voice_music_mock","storyboard","video_assets_mock","mv_compose_mock","review_gate"],
    D:["validate","script_split","shot_dag","shot_generation_mock","voice_mock","segment_compose_mock","review_gate"]
  };

  function makeId(pipelineId){
    return "CPF-"+pipelineId+"-"+Date.now()+"-"+Math.random().toString(36).slice(2,8);
  }

  function newJob(pipelineId){
    const p=pipelines[pipelineId];
    if(!p) throw new Error("unknown pipeline");
    return {
      schema_version:"factory.job.v1",
      factory_version:VERSION,
      job_id:makeId(pipelineId),
      pipeline_id:pipelineId,
      universe:p.sample.universe,
      mode:"mock",
      status:"draft",
      source_ref:{system:"catpaw-ai-studio",id:"p1-local-mock"},
      canon_ref:pipelineId==="A"?{database_version:"v3",character:p.sample.subject,status:"needs_review"}:null,
      inputs:{subject:p.sample.subject},
      output_spec:{target:p.sample.output,aspect_ratio:pipelineId==="D"?"16:9":"9:16"},
      budget:{currency:"TWD",max_amount:0,paid_enabled:false,estimated:0,actual:0},
      approval:{asset:"pending",paid_batch:"pending",publish:"pending"},
      created_at:new Date().toISOString(),
      updated_at:new Date().toISOString(),
      steps:stepTemplates[pipelineId].map((step,index)=>({
        step_id:pipelineId+"-"+String(index+1).padStart(2,"0")+"-"+step,
        depends_on:index?[pipelineId+"-"+String(index).padStart(2,"0")+"-"+stepTemplates[pipelineId][index-1]]:[],
        provider:index===stepTemplates[pipelineId].length-1?"manual_review_gate":p.provider,
        provider_task_id:null,
        status:"pending",
        attempt:0,
        mock:true,
        cost_twd:0
      })),
      events:[]
    };
  }

  function event(job,type,message){
    job.events.push({at:new Date().toISOString(),type,message});
    job.updated_at=new Date().toISOString();
  }

  async function run(pipelineId,onUpdate){
    const job=newJob(pipelineId);
    const update=()=>{persist(job); if(onUpdate) onUpdate(JSON.parse(JSON.stringify(job)));};
    event(job,"created","Mock job created; paid providers disabled.");
    job.status="validated"; update();

    for(const step of job.steps){
      step.status="running"; step.attempt=1;
      job.status="running";
      event(job,"step_running",step.step_id);
      update();
      await new Promise(r=>setTimeout(r,90));

      if(step.provider==="manual_review_gate"){
        step.status="completed";
        job.status="awaiting_review";
        event(job,"review_gate","Mock output ready for human review. Publish remains pending.");
      } else {
        step.status="completed";
        step.provider_task_id="mock-"+pipelineId+"-"+step.attempt;
        event(job,"step_completed",step.step_id);
      }
      update();
    }

    job.status="awaiting_review";
    job.mock_result={
      success:true,
      paid_calls:0,
      publish_calls:0,
      actual_cost_twd:0,
      artifact_type:pipelines[pipelineId].sample.output
    };
    event(job,"completed","P1 mock closed loop completed safely.");
    update();
    return job;
  }

  function persist(job){
    const all=JSON.parse(localStorage.getItem("catpaw_factory_jobs")||"[]");
    const idx=all.findIndex(x=>x.job_id===job.job_id);
    if(idx>=0) all[idx]=job; else all.unshift(job);
    localStorage.setItem("catpaw_factory_jobs",JSON.stringify(all.slice(0,50)));
  }

  function list(){return JSON.parse(localStorage.getItem("catpaw_factory_jobs")||"[]");}
  function clear(){localStorage.removeItem("catpaw_factory_jobs");}

  return {version:VERSION,pipelines,newJob,run,list,clear};
})();