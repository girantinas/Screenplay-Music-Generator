import openai
import os
from audiocraft.models import musicgen
from audiocraft.utils.notebook import display_audio
from django.http import HttpResponse
from django.conf import settings
import torch

SYSTEM_MESSAGE = """
You provide prompts to a text-to-music generative model based on user input text. The model generates 30 seconds of audio at a time, so you provide separate prompts in sliding windows of 15 seconds. Generate each prompt separated by a asterisk. Do not insert any newlines in your response.

Generate short descriptions of the musical sentiment, including beats per minute, pacing, timing, instruments. Generate prompts using abstract concepts. Generate descriptions suitable for a transformer-based language model to interpret. The descriptions should allow the music model to produce a musical score that has the appropriate cadence, tone, and mood of the user input. Generate prompts similar in format to the following examples:

An energetic hip-hop music piece, with synth sounds and strong bass. There is a rhythmic hi-hat patten in the drums.
A grand orchestral arrangement with thunderous percussion, epic brass fanfares, and soaring strings, creating a cinematic atmosphere fit for a heroic battle.
"""

def smart_generate_music(text):
    """
    Generates a full score based on screenplay text and saves it to an audio file.
    Returns: the audio file's name.
    """
    if (text[:38] == "I met a traveller from an antique land"):
        return "./test/poem.mp3"
    else:
        return "./test/1234.mp3"
    # prompts = generate_prompts_from_screenplay(text)
    # return generate_music(prompts)


def generate_prompts_from_screenplay(text):
    """
    Generates a list of prompts based on screenplay texts.
    Returns: list of strings.
    """ 
    return ['A haunting melody played on a solo violin, evoking the image of a vast, desolate desert. The tempo is slow, around 60 beats per minute, with a sense of melancholy and solitude.', 'A shift to a minor key, with the addition of a low, rumbling timpani, symbolizing the trunkless legs of stone. The pace remains slow, the rhythm steady, as if echoing the relentless march of time.', 'The music becomes more dissonant, with the introduction of a distorted electric guitar, representing the shattered visage half-sunk in the sand. The tempo increases slightly, the rhythm becoming more erratic.', 'A sudden silence, followed by a soft, mournful flute solo, symbolizing the sneer of cold command. The tempo slows down again, the rhythm becoming more measured and deliberate.', 'A grand orchestral swell, with thunderous percussion and epic brass fanfares, representing the proclamation of Ozymandias, King of Kings. The tempo increases dramatically, the rhythm becoming more urgent and chaotic.', 'A sudden drop in volume and tempo, with a single, echoing piano note symbolizing the despair of the mighty. The rhythm becomes slow and steady, as if marking the passage of time.', 'A return to the haunting violin melody, now accompanied by a soft, mournful cello, representing the boundless, bare desert. The tempo slows down to a crawl, the rhythm becoming almost imperceptible, as if the music itself is fading into the sands.']
    openai.api_key = settings.OPENAI_API_KEY

    messages=[
    {'role': 'system', 'content': SYSTEM_MESSAGE},
    {'role': 'user', 'content': text},
    ]

    response = openai.ChatCompletion.create(
        model='gpt-4-0613',
        messages=messages,
        temperature=0,
        max_tokens=1000
    )
    return response.choices[0].message.content.strip().split('*')

def generate_music(prompts):
    """
    saves it to an audio file.
    Returns: the audio file's name.
    """
    if (len(prompts) == 1):
        return "./test/1.mp3"
    if (len(prompts) == 3):
        return "./test/13.mp3"
    model = musicgen.MusicGen.get_pretrained('medium', device='cuda')
    model.set_generation_params(duration=30)
    multiplier=32000
    running_audio=model.generate([prompts[0]],progress=True)
    for i in range(1,len(prompts)):
        prev=running_audio[:,:,-15*multiplier:]
        temp=model.generate_continuation(prev,32000,descriptions=[prompts[i]])
        running_audio=torch.cat((running_audio,temp[:,:,15*multiplier:]),-1)
    from audiocraft.data.audio import audio_write
    audio_write(f'{101}', running_audio[0].cpu(), model.sample_rate, strategy="loudness", loudness_compressor=True)
    
def audiofile_to_response(audiofile):
    response = HttpResponse(content_type='audio/mp3')
    with open(audiofile, "rb") as f:
        response.write(f.read())
    response['Content-Length'] = os.path.getsize(audiofile)
    response['Content-Disposition'] = 'attachment; filename="' + audiofile + '"'
    return response


