import { makeObservable, observable } from "mobx"

import { TimeTrackerService } from "@services/timer.service"

import { ITrackedTime } from "@servcy/types"

import { RootStore } from "./root.store"

export interface ITimerStore {
    timerMap: Record<string, ITrackedTime>
    isTimerRunning: boolean
    startTimer: (
        workspaceSlug: string,
        projectId: string,
        issueId: string,
        data: Partial<ITrackedTime>
    ) => Promise<ITrackedTime>
}

export class TimerStore implements ITimerStore {
    timerMap: Record<string, ITrackedTime> = {}
    isTimerRunning = false
    router
    timerService

    constructor(_rootStore: RootStore) {
        makeObservable(this, {
            timerMap: observable,
            isTimerRunning: observable,
        })
        this.timerService = new TimeTrackerService()
        this.router = _rootStore.app.router
    }

    /**
     * Start timer for an issue
     * @param workspaceSlug
     * @param projectId
     * @param issueId
     * @param data
     * @returns
     */
    startTimer = async (workspaceSlug: string, projectId: string, issueId: string, data: Partial<ITrackedTime>) => {
        try {
            const response = await this.timerService.startIssueTimer(workspaceSlug, projectId, issueId, data)
            this.isTimerRunning = true
            this.timerMap[issueId] = response
            return response
        } catch (error) {
            console.error("Error starting timer", error)
        }
    }
}