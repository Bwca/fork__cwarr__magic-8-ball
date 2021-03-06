import { AbstractRenderer } from './abstract-renderer.class';
import { AnswerPayload } from './answer-payload.model';
export declare class THREEBall8Renderer implements AbstractRenderer {
    private readonly globalUniforms;
    private readonly scene;
    private texture;
    private camera;
    private renderer;
    private controls;
    private readonly clock;
    private isRunning;
    private writing;
    constructor(ballColor?: number | string, initialFieldOfView?: number);
    showBall(host?: HTMLElement): void;
    hideAnswer(): void;
    showAnswer({ answer, event, lineSeparator }: AnswerPayload): void;
    private get isTextVisible();
    private hideText;
    private showText;
    private isEventInsideCentralCircle;
    private setupControls;
    private setupCamera;
    private setupRenderer;
    private loadTexture;
    private addLighting;
    private addWriting;
    private addTheBall;
    private addBackground;
    private startAnimationLoop;
    private setNewText;
    private generateAnimation;
}
